import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

function AdminLayout({ children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            {/* Sidebar */}
            <div
                style={{
                    flex: '0 0 auto', // Sidebar có kích thước cố định
                    width: isSidebarCollapsed ? '60px' : '250px',
                    transition: 'width 0.3s ease',
                    overflowY: 'auto',
                }}
            >
                <AdminSidebar isSidebarCollapsed={isSidebarCollapsed} />
            </div>

            {/* Main content */}
            <div
                style={{
                    flex: '1', // Nội dung chính chiếm phần còn lại
                    transition: 'margin-left 0.3s ease',
                }}
            >
                <AdminHeader toggleSidebar={toggleSidebar} />
                <main className="p-2">{children}</main>
            </div>
        </div>
    );
}

export default AdminLayout;
