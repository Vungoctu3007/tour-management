import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoleAndPermissionsByUserId } from '../../services/decentralizationService'; // Import API
import sidebar_items from '../../constants/sidebar_items'; // Danh sách sidebar gốc
import CircleIcon from '@mui/icons-material/Circle';
import logo from '../../assets/images/logo.png';
import styles from './AdminSidebar.module.css';

function AdminSidebar({ isSidebarCollapsed }) {
    const [filteredSidebarItems, setFilteredSidebarItems] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

    useEffect(() => {
        const fetchPermissions = async () => {
            const result = await getRoleAndPermissionsByUserId(userId); // Gọi API
            if (result && result.permissions) {
                setPermissions(result.permissions); // Lưu danh sách permissions
            }
        };

        fetchPermissions();
    }, [userId]);

    useEffect(() => {
        // Lọc các mục cha và mục con dựa trên permissions
        const filteredItems = sidebar_items
            .filter((item) => permissions.includes(item.title)) // Hiển thị mục cha nếu có quyền
            .map((item) => {
                const parentItem = { ...item }; // Tạo bản sao để tránh thay đổi gốc
                if (parentItem.item) {
                    // Lọc mục con dựa trên quyền của mục cha
                    parentItem.item = parentItem.item.filter((subItem) =>
                        permissions.includes(item.title)
                    );
                }
                return parentItem;
            });
        setFilteredSidebarItems(filteredItems); // Cập nhật danh sách sidebar
    }, [permissions]);

    const handleToggle = (id) => {
        setActiveIndex(activeIndex === id ? null : id);
    };

    const renderSubItems = (subItems, isOpen) => (
        <ul
            className={`nav flex-column ms-4 ${styles.submenu} ${
                isOpen ? styles['submenu-open'] : ''
            }`}
        >
            {subItems.map((subItem, index) => (
                <li key={index} className={styles.submenuItem}>
                    <Link
                        to={subItem.to}
                        className={`nav-link text-dark ${styles.submenuLink}`}
                    >
                        <CircleIcon
                            style={{ fontSize: '10px', marginRight: '10px' }}
                        />
                        {!isSidebarCollapsed && subItem.title}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <div
            className={`d-flex flex-column bg-light ${styles.sidebar}`}
            style={{
                maxHeight: '100vh',
                overflow: 'auto',
                width: isSidebarCollapsed ? '60px' : '250px',
                transition: 'width 0.3s ease',
            }}
        >
            {/* Logo */}
            <div
                className="d-flex align-items-center mb-4"
                style={{
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                }}
            >
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: isSidebarCollapsed ? '40px' : '200px',
                        height: isSidebarCollapsed ? '40px' : '130px',
                        marginRight: isSidebarCollapsed ? '0' : '10px',
                    }}
                />
            </div>

            {/* Sidebar menu */}
            <ul className="nav nav-pills flex-column mb-auto">
                {filteredSidebarItems.map((item) => (
                    <li className="nav-item" key={item.id}>
                        <div
                            onClick={() => handleToggle(item.id)}
                            className="d-flex justify-content-between align-items-center"
                            style={{ cursor: 'pointer' }}
                        >
                            <Link
                                to={item.to}
                                className={`nav-link text-dark ${styles.menuLink}`}
                                style={{
                                    justifyContent: isSidebarCollapsed
                                        ? 'center'
                                        : 'flex-start',
                                }}
                            >
                                <span
                                    style={{
                                        marginRight: isSidebarCollapsed
                                            ? '0'
                                            : '10px',
                                    }}
                                >
                                    {item.icon}
                                </span>
                                {!isSidebarCollapsed && item.title}
                            </Link>
                            {item.iconUp && !isSidebarCollapsed && (
                                <span
                                    style={{
                                        transition: 'transform 0.6s',
                                        transform:
                                            activeIndex === item.id
                                                ? 'rotate(180deg)'
                                                : 'rotate(0deg)',
                                    }}
                                >
                                    {item.iconUp}
                                </span>
                            )}
                        </div>
                        {item.item &&
                            activeIndex === item.id &&
                            renderSubItems(item.item, activeIndex === item.id)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminSidebar;
