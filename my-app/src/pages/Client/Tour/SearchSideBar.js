import { useState, useEffect } from "react";
import { getAllArrival } from "../../../services/arrivalService";
import styles from "./Tour.module.css"
function SearchSideBar({ selectArrivalName }) {
  const [arrival, setArrival] = useState([]);
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
  return (
    <div>
      <ul className="list-unstyled">
        {arrival.map((arrival, index) => (
          <li
            className={`${styles.pointer} mt-2`}
            onClick={() => selectArrivalName(arrival.arrivalName)}
            key={index}
          >
            {arrival.arrivalName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchSideBar;
