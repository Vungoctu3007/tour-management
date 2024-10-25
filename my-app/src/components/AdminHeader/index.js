import Avatar from "@mui/material/Avatar";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
function AdminHeader() {
  return (
    <div
      className="d-flex justify-content-between align-items-center p-2"
      style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd" }}
    >
      {/* Left-side Toggle Button */}
      <div className="d-flex">
      <button className="btn btn-light">
        <MenuIcon/>
      </button>
      <div className="input-group ms-2" style={{ width: "400px" }}>
        <span className="input-group-text">
          <SearchIcon/>
        </span>
        <input type="text" className="form-control" placeholder="Search" />
      </div>
      </div>
  

      {/* Search Input */}
     

      {/* Right-side Icons */}
      <div className="d-flex align-items-center">
      <div className="btn-group " style={{ marginRight: "40px" }}>
              <Avatar
                className=" btn-danger "
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />
              <div className="dropdown-menu ">
                {/* <ProfileItem width="250px" /> */}
              </div>
            </div>
        {/* Profile Picture Placeholder */}
      </div>
    </div>
  );
}

export default AdminHeader;
