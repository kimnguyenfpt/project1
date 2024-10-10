import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/Sidebar.css'; 

const Sidebar: React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation(); // Gets the current path
    const navigate = useNavigate(); // Khởi tạo useHistory

    // Function to check if the link is active
    const isActive = (path: string) => {
        console.log(location.pathname); // Kiểm tra giá trị đường dẫn
        return location.pathname === path;
    };

    const handleLogout = () => {

        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="logo">
                <img src="/img/Alta.png" alt="Logo" className="logo-Alta" />
            </div>
            <nav>
                <ul>
                    <li className={isActive('/') ? 'active' : ''}>
                        <Link to="/">
                            <img src="/img/dashboard.png" alt="Dashboard Icon" className="icon" />
                            Dashboard
                        </Link>
                    </li>
                    <li className={isActive('/devices') ? 'active' : ''}>
                        <Link to="/devices">
                            <img src="/img/monitor.png" alt="Monitor Icon" className="icon" />
                            Thiết bị
                        </Link>
                    </li>
                    <li className={isActive('/service') ? 'active' : ''}>
                        <Link to="/service">
                            <img src="/img/service.png" alt="Service Icon" className="icon" />
                            Dịch vụ
                        </Link>
                    </li>
                    <li className={isActive('/number') ? 'active' : ''}>
                        <Link to="/number">
                            <img src="/img/capso.png" alt="Capso Icon" className="icon" />
                            Cấp số
                        </Link>
                    </li>
                    <li className={isActive('/report') ? 'active' : ''}>
                        <Link to="/report">
                            <img src="/img/report.png" alt="Report Icon" className="icon" />
                            Báo cáo
                        </Link>
                    </li>
                    <li 
                        onMouseEnter={() => setDropdownOpen(true)} 
                        onMouseLeave={() => setDropdownOpen(false)}
                        className={isActive('/settings') ? 'active' : ''}
                    >
                        <Link to="/settings">
                            <img src="/img/setting.png" alt="Setting Icon" className="icon" />
                            Cài đặt hệ thống
                            <img src="/img/setting1.png" alt="Additional Icon" className="icon" style={{ marginLeft: '18px' }} />
                        </Link>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><Link to="/roles">Quản lý vai trò</Link></li>
                                <li><Link to="/accounts">Quản lý tài khoản</Link></li>
                                <li><Link to="/user-logs">Nhật ký người dùng</Link></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
            <button className="logout-btn" onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="#FF7506" style={{ verticalAlign: 'middle' }}>
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                </svg>
                <span>Đăng xuất</span>
            </button>
        </aside>
    );
};

export default Sidebar;
