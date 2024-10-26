import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";

function DashBoard() {
  return (
    <div className=" ">
      <div className="d-flex justify-content-between">
        <h6 className="text-lg mb-0">Doanh Thu</h6>
        <select className="form-select form-select-sm w-auto">
          <option>Năm</option>
          <option>Tháng</option>
          <option>Tuần</option>
          <option>Ngày</option>
        </select>
      </div>
      <div className="row mt-2 g-3">
        <div className="col-lg-7 border p-2 mb-3" style={{ height: "300px" }}>
          <LineChartComponent />
        </div>
        <div className="col-lg-5 border p-2 mb-3" style={{ height: "300px" }}>
          <PieChartComponent />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
