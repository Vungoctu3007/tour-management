import React from "react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { vi } from "date-fns/locale";
import DatePicker from "react-datepicker";
import styles from "./Search.module.css";
import Notification from "../Notification";
import { getAllDeparture } from "../../services/departureService";
import { getAllArrival } from "../../services/arrivalService";
function SearchInput({ onSearchResults, currentPage, pageSize }) {
  const [departures, setDepartures] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [departureName, setDepartureName] = useState("");

  const [arrivalName, setArrivalName] = useState("");
  const [timeToDeparture, setTimeToDeparture] = useState(new Date());

  // lấy năm
  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear, 0, 1);
  const handleSearchClick = () => {
    if (arrivalName.trim() === "" && departureName.trim() === "") {
      alert("Vui lòng chọn cả điểm khởi hành và điểm đến.");
    } else {
      const formattedDate = format(timeToDeparture, "yyyy-MM-dd");
      console.log(formattedDate);
      const searchData = {
        arrivalName,
        departureName,
        timeToDeparture: formattedDate,
        currentPage,
        pageSize,
      };
      onSearchResults(searchData);
      setArrivalName("");
      setDepartureName("");
      setTimeToDeparture(new Date());
    }
  };
  // api departure
  useEffect(() => {
    const fetchDeparture = async () => {
      try {
        const data = await getAllDeparture();
        setDepartures(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDeparture();
  }, []);
  // api arrival
  useEffect(() => {
    const fetItem = async () => {
      try {
        const data = await getAllArrival();
        setArrivals(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetItem();
  }, []);
  // select departuer
  const handleSelectedDeparture = (departure) => {
    setDepartureName(departure);
  };
  // select arival
  const handleSelectedArrival = (arrival) => {
    setArrivalName(arrival);
  };

  return (
    <div className="container rounded border z-100 p-2 position-relative ">
      <div className="row">
        <div className="col-md-12">
          <div className="row g-2">
            <div className="col-12 col-md-3 dropdown">
              <div className="card p-1 d-flex " style={{ height: "60px" }}>
                <div className="d-flex align-items-center h-100">
                  <CiLocationOn size={24} className={styles.icon_search} />
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Bạn muốn đi đâu"
                    style={{ border: "none", outline: "none", height: "100%" }}
                    data-bs-toggle="dropdown"
                    value={arrivalName}
                    onChange={(e) => setArrivalName(e.target.value)}
                  />
                  <ul
                    className={`${styles.menu} dropdown-menu menu w-100`}
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      transform: "none",
                    }}
                  >
                    {arrivals.map((item, index) => (
                      <li key={index}>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() =>
                            handleSelectedArrival(item.arrivalName)
                          }
                        >
                          {item.arrivalName}: <span className="fw-bold">{item.countRoute} Tour</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="card p-1 d-flex" style={{ height: "60px" }}>
                <div className="d-flex align-items-center h-100">
                  <CiCalendar size={24} className={styles.icon_search} />

                  <DatePicker
                    selected={timeToDeparture}
                    onChange={(date) => setTimeToDeparture(date)}
                    dateFormat="eeee, yyyy--MM-dd"
                    locale={vi}
                    className={`${styles.datepicker} form-control `}
                    id="datePickerInput"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    popperClassName={styles.custom}
                    wrapperClassName={styles.react_datepicker_wrapper}
                    minDate={minDate}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3 dropdown">
              <div className="card p-1 d-flex " style={{ height: "60px" }}>
                <div className="d-flex align-items-center h-100">
                  <CiLocationArrow1 size={24} className={styles.icon_search} />
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Khởi hành từ"
                    style={{ border: "none", outline: "none", height: "100%" }}
                    data-bs-toggle="dropdown"
                    value={departureName}
                    onChange={(e) => setDepartureName(e.target.value)}
                  />
                  <ul
                    className={`${styles.menu} dropdown-menu menu w-100`}
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      transform: "none",
                    }}
                  >
                    {departures.map((item, index) => (
                      <li key={index}>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() =>
                            handleSelectedDeparture(item.departureName)
                          }
                        >
                          {item.departureName}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <button
                className="btn btn-warning w-100"
                style={{ height: "60px" }}
                onClick={() => handleSearchClick()}
              >
                Tìm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
