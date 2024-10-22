
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
function AdminLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">..,
        <AdminSidebar />
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <AdminHeader />
          <main className="pt-3">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
