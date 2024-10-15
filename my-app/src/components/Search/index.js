import { Box, IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import styles from "./Search.module.css";
function Search() {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="row border p-3 rounded d-flex align-items-center">
          <div className="col-md-4">
            <div>
              <small>Nơi xuất phát</small>
              <h6 className="mb-0">Đắk Lắk</h6>
            </div>
          </div>
          <div className="col-md-4">
            <Box
              display="flex"
              justifyContent="center"
              className={styles.swapicon}
              alignItems="center"
            >
              <IconButton>
                <SwapHorizIcon fontSize="large" />
              </IconButton>
            </Box>
          </div>
          <div className="col-md-4">
            <div>
              <small>Nơi đến</small>
              <h6 class="mb-0">Sài Gòn</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 border rounded">
        <div className="p-3 d-flex align-items-center">
          <div>
            <small>Ngày đi</small>
            <h6 className="mb-0">T3, 15/10/2024</h6>
          </div>
        </div>
      </div>
      <div className="col-md-3 border rounded ">
        <div class="p-3  d-flex align-items-center">
          <button class="btn btn-warning px-4">Tìm kiếm</button>
        </div>
      </div>
    </div>
  );
}

export default Search;
