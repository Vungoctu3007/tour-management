import Avatar from "@mui/material/Avatar";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const pages = ["Trang Chủ", "Đặt Tour", "Giới Thiệu"];
const menu_items = [
  {
    icon: "",
    title: "Hồ Sơ",
    to: "/profile",
  },
  {
    icon: "",
    title: "Tài Khoản",
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
    <Navbar  className="bg-light text-white" expand="lg">
      <Container>
        <Navbar.Brand href="#home">MyWebsite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page, index) => (
              <Nav.Link
                key={index}
                href={`#${page.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {page}
              </Nav.Link>
            ))}
          </Nav>
          {/* Dropdown Menu */}
          {currentUser ? (
            <div className="btn-group ">
              <Avatar
                className=" btn-danger "
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              />

              <ul className="dropdown-menu">
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
