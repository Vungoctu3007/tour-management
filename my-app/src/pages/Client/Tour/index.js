import Search from "../../../components/Search";
import CategoryTitle from "../../../components/CategoryTitle";
import SearchInput from "../../../components/Search/searchInput";
import styles from "./Tour.module.css";
import TourList from "../../../components/TourList";

function Tour() {
  return (
    <div className="container">
      <CategoryTitle />
      <div>
        {/* Search start */}
        <div className="row">
          <SearchInput ia={true} a={false} b={false}></SearchInput>
        </div>
        {/* search end */}
        <div className="row mt-4">
          {/*  Sidebar Filters start */}
          <div className="col-md-3">
            <div
              className={`p-2 ${styles.filte}`}
              style={{ background: "#f2f4f4", borderRadius: "16px" }}
            >
              <div className="mb-4">
                <label for="departure" className="form-label">
                  Điểm Khởi Hành
                </label>
                <select id="departure" className="form-select">
                  <option selected>----------</option>
                  <option value="1">Hồ Chí Minh</option>
                  <option value="2">Hà Nội</option>
                </select>
              </div>
              <div className="mb-4">
                <label for="destination" className="form-label">
                  Điểm Đến
                </label>
                <select id="destination" className="form-select">
                  <option selected>----------</option>
                  <option value="1">Singapore</option>
                  <option value="2">Trung Quốc</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label">Khoảng Thời Gian</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="duration"
                    id="1day"
                    value="1day"
                  />
                  <label className="form-check-label" for="1day">
                    1 ngày
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="duration"
                    id="1to3days"
                    value="1to3days"
                  />
                  <label className="form-check-label" for="1to3days">
                    1 đến 3 ngày
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="duration"
                    id="over3days"
                    value="over3days"
                  />
                  <label className="form-check-label" for="over3days">
                    Trên 3 ngày
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Loại Tour</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inbound"
                  />
                  <label className="form-check-label" for="inbound">
                    InBound
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="outbound"
                  />
                  <label className="form-check-label" for="outbound">
                    OutBound
                  </label>
                </div>
              </div>
              <div className="">
                <button className="btn btn-primary w-100">Tìm Tour</button>
              </div>
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
            <TourList isInsideCol={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
