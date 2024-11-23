import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Navbar, Nav, Container } from 'react-bootstrap';
import pages_items from '../../constants/pageItems';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import ProfileItem from '../../components/ProfileItem';
import { useNavigate } from 'react-router-dom';
function Header() {
    // Kiểm tra localStorage
    const currentUser = localStorage.getItem('userId'); // Thay "user" bằng key bạn sử dụng để lưu thông tin người dùng
    const navigate = useNavigate();
    const handleRegister = () => {
      navigate("/register");
    };
  
    return (
        <Navbar className="" style={{ backgroundColor: '#259ed5' }} expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} alt="Logo" style={{ height: '60px', width: '100px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="me-auto">
                        {pages_items.map((page, index) => (
                            <Nav.Link key={index} href={page.to} className="text-white fw-bold">
                                {page.title}
                            </Nav.Link>
                        ))}
                    </Nav>
                    {/* Hiển thị dựa trên trạng thái currentUser */}
                    {currentUser ? (
                        <div className="btn-group" style={{ marginRight: '40px' }}>
                            <Avatar
                                className="btn-danger"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="dropdown-menu dropdown-menu-end" style={{ right: 0 }}>
                                <ProfileItem width="200px" />
                            </div>
                        </div>
                    ) : (
                        <div className="btn-group">
                            <Avatar
                                className="btn-danger"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: 'pointer' }}
                            />
                            {/* Dropdown content */}
                            <div
                                className="dropdown-menu dropdown-menu-end p-3"
                                style={{
                                    width: '200px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                }}
                            >
                                {/* Button Đăng ký */}
                                <button
                                    className="btn btn-primary w-100 mb-2"
                                    onClick={handleRegister}
                                    style={{
                                        backgroundColor: '#02b3e4',
                                        border: 'none',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Đăng ký
                                </button>
                                {/* Text Đăng nhập */}
                                <div className="text-center">
                                    <span>Bạn đã có tài khoản?</span>
                                    <br />
                                    <Link to="/login" style={{ color: '#02b3e4', fontWeight: 'bold' }}>
                                        Đăng nhập ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
