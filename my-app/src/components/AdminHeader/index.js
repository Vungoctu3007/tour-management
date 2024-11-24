import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
function AdminHeader({ toggleSidebar }) {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || 'Guest';
        setUsername(storedUsername);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');

        window.location.href = '/login';
    };

    return (
        <div
            className="d-flex justify-content-between align-items-center p-2"
            style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}
        >
            <div className="d-flex">
                <button className="btn btn-light" onClick={toggleSidebar}>
                    <MenuIcon />
                </button>
                <div className="input-group ms-2" style={{ width: '400px' }}>
                    <span className="input-group-text">
                        <SearchIcon />
                    </span>
                    <input type="text" className="form-control" placeholder="Search" />
                </div>
            </div>

            <div className="d-flex align-items-center">
                <span className="me-2 fw-bold">{username}</span>
                <div className="btn-group">
                    <Avatar
                        className="btn-danger"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: 'pointer' }}
                    />
                    <div className="dropdown-menu dropdown-menu-end">
                        <button className="dropdown-item" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;
