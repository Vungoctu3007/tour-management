import { useState, useEffect } from "react";
import { getAllArrival } from "../../../services/arrivalService";

import styles from "./Tour.module.css";
function SearchSideBar({ selectArrivalName ,isReset}) {
  const [arrival, setArrival] = useState([]);
  const [selectedArrivalIndex, setSelectedArrivalIndex] = useState(null);


  useEffect(() => {
    const fet = async () => {
      try {
        const data = await getAllArrival();
        setArrival(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fet();
  }, []);
  
  useEffect(() => {
    if (isReset) {
      setSelectedArrivalIndex(null);
    }
  }, [isReset]);
  const handleItemClick = (arrivalName, index) => {
    selectArrivalName(arrivalName);
    setSelectedArrivalIndex(index);
  };
  return (
    <div>
    
      {/* list tour */}
      <div className={`${styles.filte} card mt-2`}>
        <div className="card-header bg-light fw-bold fs-5">Danh Sách Tour</div>
        <div className="card-body">
          <div>
            <ul className="list-unstyled">
              {arrival.map((arrival, index) => (
                <li
                  className={`mt-2 ${styles.pointer}
                  ${selectedArrivalIndex === index ? styles.selected : ""}`}
                  onClick={() => handleItemClick(arrival.arrivalName, index)}
                  key={index}
                >
                  {arrival.arrivalName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSideBar;
