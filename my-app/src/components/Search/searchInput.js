import React from "react";
import { useState, useRef, useEffect } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { vi } from "date-fns/locale";
import DatePicker from "react-datepicker";
import styles from "./Search.module.css";
import SearchItem from "./SearchItem";
import { getAllDeparture } from "../../services/departureService";
function SearchInput({ onSearchResults, currentPage, pageSize }) {
  const [departures, setDepartures] = useState([]);
  const [showSearchItem, setShowSearchItem] = useState(false);
  const [departureName, setDepartureName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [arrivalName, setArrivalName] = useState("");
  const [timeToDeparture, setTimeToDeparture] = useState("2024-10-29");
  const handleSearchClick = () => {
    if (arrivalName.trim() === "" && departureName.trim() === "") {
      alert("Vui lòng chọn cả điểm khởi hành và điểm đến.");
    } else {
      const searchData = {
        arrivalName,
        departureName,
        timeToDeparture,
        currentPage,
        pageSize,
      };
      onSearchResults(searchData);
      setArrivalName("");
      setDepartureName("");
    }
  };
  // api departure
  useEffect(() => {
    const fetchDeparture = async () => {
      try {
        const fetchDeparture = await getAllDeparture();
        setDepartures(fetchDeparture.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDeparture();
  }, []);
  // select departuer
  const handleSelectedDeparture = (departure) => {
    setDepartureName(departure);
  };
  // slect arival
  const handleSelectedArrival = (arrival) => {
    setArrivalName(arrival);
    setShowSearchItem(false);
  };
  const searchItemRef = useRef(null);
  const inputRef = useRef(null);
  // show arival
  const handleArrivalSelect = () => {
    setShowSearchItem(true);
  };

  // handle click in outside
  const handleClickOutside = (event) => {
    if (
      searchItemRef.current &&
      !searchItemRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowSearchItem(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container rounded border z-100 p-2 position-relative ">
      <div className="row">
        <div className="col-md-12">
          <div className="row g-2">
            <div className="col-12 col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <CiLocationOn size={24} />
                </span>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Bạn muốn đi đâu?"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  style={{ height: "60px" }}
                  onFocus={handleArrivalSelect}
                  ref={inputRef}
                  value={arrivalName}
                  onChange={(e) => setArrivalName(e.target.value)}
                />
              </div>
            </div>
            {showSearchItem && (
              <div ref={searchItemRef} className={styles.search_item}>
                <SearchItem handleSelectedArrival={handleSelectedArrival} />
              </div>
            )}
            <div className="col-12 col-md-3">
              <div className="card p-1 d-flex" style={{ height: "60px" }}>
                <div className="d-flex align-items-center h-100">
                  <CiCalendar size={24} className={styles.icon_search} />

                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="eeee, dd-MM-yyyy"
                    locale={vi}
                    className={`${styles.datepicker} form-control `}
                    id="datePickerInput"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    popperClassName={styles.custom}
                    wrapperClassName={styles.react_datepicker_wrapper}
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
                    value={departureName }
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
