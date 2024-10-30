import SwapVertIcon from '@mui/icons-material/SwapVert';
import CategoryTitle from "../../../components/CategoryTitle";
import SearchInput from "../../../components/Search/searchInput";
import styles from "./Tour.module.css";
import SortForm from './SortForm';
import TourList from "../../../components/Tour/TourList";
function Tour() {
  return (
    <div className="container">
      <div>
        {/* Search start */}
        <div className="row">
          <SearchInput ></SearchInput>
        </div>
        <div className="row mt-4">
          <CategoryTitle />
        </div>
        {/* search end */}
        <div className="row mt-4">
          {/*  Sidebar Filters start */}
          <div className="col-md-3">
            <div className={`${styles.filte} card`}>
              <div className="card-header bg-light">
               <SwapVertIcon/> Sắp xếp
              </div>
              <div className="card-body">
                <SortForm/>
              </div>
            </div>

            {/*  */}
            <div className={`${styles.filte} card`}>dgdsg</div>
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
            <TourList  isHorizontal={true} isInsideCol={true} isShowPagination={true}/>
            {/* Tour List end */}
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
