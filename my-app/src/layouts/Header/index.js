import Avatar from "@mui/material/Avatar";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import { Fragment } from "react";

const pages_items=[
  {
    title:"Trang Chủ",
    to:"/"
  },
  {
    title:"Đặt Tour",
    to:"/tour"
  },
  {
    title:"Giới Thiệu",
    to:"/about_us"
  },
]
const menu_items = [
  {
    icon: "",
    title: "Hồ Sơ",
    to: "/profile",
  },
  {
    icon: "",
    title: "Đơn Hàng",
    to: "/profile",
  },
  {
    icon: "",
    title: "Khuyễn Mãi",
    to: "/profile",
  },
  {
    icon: "",
    title: "Đăng Xuất",
    to: "/login",
    divider: true,
  },
];

function Header() {
  const currentUser = true;

  return (
    <Navbar style={{backgroundColor:"#259ed5"}} className="" expand="lg">
      <Container>
        <Navbar.Brand href="#home">TOUR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages_items.map((page, index) => (
              <Nav.Link
                key={index}
                href={page.to}
                className="text-white"
              >
                {page.title}
              </Nav.Link>
            ))}
          </Nav>
          {/* Dropdown Menu */}
          {currentUser ? (
            <div className="btn-group " style={{marginRight:"40px"}}>
              <Avatar
                className=" btn-danger "
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />

              <ul className="dropdown-menu "  >
                {menu_items.map((item, index) => (
                  <Fragment key={index}>
                    {index === menu_items.length - 1 && (
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    )}
                    <li>
                      <Link className="dropdown-item" to={item.to}>
                        {item.title}
                      </Link>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>
          ) : (
            <Button variant="outline-primary" href="/login">
              Đăng Nhập{" "}
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
