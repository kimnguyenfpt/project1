import React, { useState, useRef } from 'react'; // Thêm useRef
import { useNavigate } from 'react-router-dom'; // Thay thế useHistory bằng useNavigate
import NotificationDropdown from '../Notification/NotificationDropdown';
import './Header.css';

interface HeaderProps {
  pageTitle: string; 
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (): void => {
    setDropdownVisible(!dropdownVisible);
    if (notificationRef.current) {
      notificationRef.current.classList.toggle('active');
    }
  };

  return (
    <header className="header">
      <div className="personal-info">
        {/* Sử dụng pageTitle để hiển thị tiêu đề trang động */}
        <span className="info-title">{pageTitle}</span>
      </div>

      <div className="notification-container">
        <div className="notification" onClick={toggleDropdown} ref={notificationRef}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="#FFAC6A">
            <path d="M224 0c-17.7 0-32 14.3-32 32v19.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416h384c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8v-18.8c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zM269.3 493.3c12-12 18.7-28.3 18.7-45.3H160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7 33.3-6.7 45.3-18.7z"/>
          </svg>
        </div>
        {dropdownVisible && <NotificationDropdown />}
      </div>

      <div className="user-info">
        <img src="/img/user.png" alt="User" className="profile-img" />
        <div className="text-info">
          <span className="welcome">Xin chào</span>
          <span className="user-name" style={{cursor: 'pointer'}} onClick={() => navigate('/profile')}>Lê Quỳnh Ái Vân</span> 
        </div>
      </div>
    </header>
  );
};

export default Header;
