import LineChartComponent from "./LineChartComponent";

function DashBoard() {
  return (
    <div className="p-4 border rounded">
      <div className="d-flex justify-content-between">
        <h6 className="text-lg mb-0">Doanh Thu</h6>
        <select className="form-select form-select-sm w-auto">
          <option>Năm</option>
          <option>Tháng</option>
          <option>Tuần</option>
          <option>Ngày</option>
        </select>
      </div>
      <div className="mt-4" >
      {/* <LineChartComponent /> */}
        <div className="row">
          <div className="col-7" style={{ height: "300px" }}>
            <LineChartComponent />
          </div>
          <div className="col-5"></div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
