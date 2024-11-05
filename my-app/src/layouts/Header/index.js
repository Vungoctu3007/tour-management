import Avatar from "@mui/material/Avatar";
import { Navbar, Nav, Container } from "react-bootstrap";
import pages_items from "../../constants/pageItems";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import ProfileItem from "../../components/ProfileItem";
function Header() {
  const currentUser = true;
  return (
    // #259ed5
    <Navbar  className="" style={{backgroundColor:"#259ed5"}} expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "60px", width: "100px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="me-auto">
            {pages_items.map((page, index) => (
              <Nav.Link
                key={index}
                href={page.to}
                className="text-white fw-bold"
              >
                {page.title}
              </Nav.Link>
            ))}
          </Nav>
          {/* Dropdown Menu */}
          {currentUser ? (
            <div className="btn-group " style={{ marginRight: "40px" }}>
              <Avatar
                className=" btn-danger "
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />
              <div className="dropdown-menu dropdown-menu-end"  style={{ right: 0 }} >
                <ProfileItem width="200px"/>
              </div>
            </div>
          ) : (
            <Nav>
              <Link to="/login" className="text-white fw-bold">
                Đăng Nhập
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
