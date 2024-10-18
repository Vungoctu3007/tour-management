import styles from "./Search.module.css";
import Images from "../../assets/images/item_search.jpg";

const searchItem = [
  {
    imageUrl: Images,
    title: "Đà Lạt",
    holteCount: 20,
  },
  {
    imageUrl: Images,
    title: "Đà Lạt",
    holteCount: 20,
  },
  {
    imageUrl: Images,
    title: "Đà Lạt",
    holteCount: 20,
  },
  {
    imageUrl: Images,
    title: "Đà Lạt",
    holteCount: 20,
  },
];
function SearchItem({ ia }) {
  const co = ia ? "" : "col-sm-6 col-md-3 ";
  // width:'340px',
  const withd=ia ? {width:'340px',  maxHeight: '60vh',overflowY:'auto' } : {};
  return (
    <div
      className={styles.searchItemContainer + " bg-white border rounded p-2 "}
      style={withd}
    >
      <h5 class="mb-3">Địa điểm đang HOT nhất</h5>
      <div className={`row ${styles.searchItemList}`}>
        {searchItem.map((item, index) => (
          //
          <div className={co + "col-12 mb-3"} >
            <div
              className="card h-100 d-flex flex-row align-items-center"
              key={index}
            >
              <img
                src={item.imageUrl}
                className="card-img-top img-fluid ms-2"
                alt={item.imageUrl}
                style={{ height: "50px", width: "50px", objectFit: "cover"}}
              />
              <div className="card-body ">
                <h6 className="card-title mb-1">{item.title}</h6>
                <small>{item.holteCount} Tour</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchItem;
