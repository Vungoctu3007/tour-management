import styles from "./Search.module.css";
import { useEffect, useState } from "react";
import { getAllArrival } from "../../services/arrivalService";
function SearchItem() {
 const [searchItem,setSearchItem]=useState([])
 useEffect(()=>{
  const fetItem=async()=>{
    try {
      const result=await getAllArrival();
      setSearchItem(result.result)
    } catch (error) {
      console.error(error);
    }
  }
  fetItem();
 },[])
  return (
    <div
      className={styles.searchItemContainer + " bg-white border rounded p-2 "}
     
    >
      <h5 className="mb-3">Địa điểm đang HOT nhất</h5>
      <div className={`row ${styles.searchItemList}`}>
        {searchItem.map((item, index) => (
          //
          <div className= "col-12 mb-3 col-sm-6 col-md-3" >
            <div
              className="card h-100 d-flex flex-row align-items-center"
              key={index}
            >
              {/*  src={require(`../../assets/images/Tour/${route.textImage}`)} */}
              <img
                src={require(`../../assets/images/Tour/${item.textImage}`)}
                className="card-img-top img-fluid ms-2"
                alt={item.textImage}
                style={{ height: "50px", width: "50px", objectFit: "cover"}}
              />
              <div className="card-body ">
                <h6 className="card-title mb-1">{item.arrivalName}</h6>
                <small>{item.countRoute} Tour</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchItem;
