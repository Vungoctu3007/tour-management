import CategoryTitle from "../../../components/CategoryTitle";
import SearchInput from "../../../components/Search/searchInput";
import styles from "./Tour.module.css";
import TourItem from "../../../components/TourItem";
import PaginationComponent from "../../../components/Pagination";
function Tour() {
  return (
    <div className="container">
      {/* <TourBookingCalendar/> */}
      <div>
        {/* Search start */}
        <div className="row">
          <SearchInput ia={true}  c={false}></SearchInput>
        </div>
        <div className="row mt-4">
          <CategoryTitle />
        </div>
        {/* search end */}
        <div className="row mt-4">
          {/*  Sidebar Filters start */}
          <div className="col-md-3">
            <div
              className={`${styles.filte} card`}
              // style={{ background: "#f2f4f4", borderRadius: "16px" }}
            >
              <div className="card-header bg-light">
                <i class="bi bi-arrow-down-up"></i> Sắp xếp
              </div>
              <div className="card-body">
                <form>
                <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="sortOptions"
                      id="priceLowToHigh"
                      value="priceLowToHigh"
                      checked
                    />
                    <label className="form-check-label" for="priceLowToHigh">
                      Mặc định
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="sortOptions"
                      id="priceLowToHigh"
                      value="priceLowToHigh"
                    />
                    <label className="form-check-label" for="priceLowToHigh">
                      Giá: Thấp đến cao
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="sortOptions"
                      id="priceHighToLow"
                      value="priceHighToLow"
                    />
                    <label className="form-check-label" for="priceHighToLow">
                      Giá: Cao đến thấp
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="sortOptions"
                      id="bestRating"
                      value="bestRating"
                      
                    />
                    <label className="form-check-label" for="bestRating">
                      Đánh giá tốt nhất
                    </label>
                  </div>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="sortOptions"
                      id="bestRating"
                      value="bestRating"
                      
                    />
                    <label className="form-check-label" for="bestRating">
                      Ưu đãi tốt nhất
                    </label>
                  </div>
                </form>
              </div>
            </div>

            {/*  */}
            <div className={`${styles.filte} card`}>
                dgdsg
            </div>
          </div>
          {/* sidebar Filters end */}
          <div className="col-md-9">
            <div
              className="rounded-pill d-flex justify-content-between align-items-center mb-3 p-2"
              style={{ background: "#f2f4f4" }}
            >
              <span>Showing 1-10 of 36 results</span>
            </div>
            {/* Tour List */}
            <TourItem isInsideCol={true} isHorizontal={true} />
            <PaginationComponent count={10}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
