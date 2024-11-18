import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const columns = [
  { field: "Id", label: "ID", width: "50px" },
  { field: "name", label: "Tên khuyến mãi" },
  { field: "percent", label: "% giảm", width: "100px" },
  { field: "start_data", label: "Ngày bắt đầu" },
  { field: "end_data", label: "Ngày kết thúc" },
  { field: "created_at", label: "Ngày Tạo" },
  { field: "actions", label: "Hành động", width: "150px" },
];

const fakeData = [
  {
    Id: 1,
    name: "Giảm giá mùa hè",
    percent: "20%",
    start_data: "2024-06-01",
    end_data: "2024-06-30",
    created_at: "2024-05-20",
  },
  {
    Id: 2,
    name: "Black Friday",
    percent: "50%",
    start_data: "2024-11-25",
    end_data: "2024-11-28",
    created_at: "2024-11-01",
  },
  {
    Id: 3,
    name: "Tết Nguyên Đán",
    percent: "30%",
    start_data: "2025-01-15",
    end_data: "2025-01-30",
    created_at: "2025-01-01",
  },
];

function Promotion() {
  const handleEdit = (id) => {
    alert(`sửa khuyễn mãi với ID: ${id}`);
    // Thêm logic xử lý sửa khuyến mãi ở đây
  };

  const handleDelete = (id) => {
    alert(`xóa khuyễn mãi với ID: ${id}`);
    // Thêm logic xử lý xóa khuyến mãi ở đây
  };

  return (
    <div className="container">
      <div className="row">
        <div className="input-group p-0" style={{ width: "400px" }}>
          <span className="input-group-text">
            <SearchIcon />
          </span>
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </div>
      <div className="row mt-2">
        <table className="table table-striped">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.field} style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fakeData.map((row) => (
              <tr key={row.Id}>
                {columns.map((col) => (
                  <td key={col.field}>
                    {col.field === "actions" ? (
                      <div>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(row.Id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(row.Id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ) : (
                      row[col.field]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Promotion;
