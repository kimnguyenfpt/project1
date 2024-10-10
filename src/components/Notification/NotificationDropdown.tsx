import React from 'react';
import './Dropdown.css'

const NotificationDropdown: React.FC = () => { 
  const notifications = [
    { name: "Nguyễn Thị Thùy Dung", time: "12h20 ngày 30/11/2021" },
    { name: "Nguyễn Thiên Chinh", time: "12h20 ngày 30/11/2021" },
    { name: "Võ Thị Kim Liên", time: "12h20 ngày 30/11/2021" },
    { name: "Hoàng Nguyễn Quốc Huy", time: "12h20 ngày 30/11/2021" },
    { name: "Võ Ngọc Lan Anh", time: "12h20 ngày 30/11/2021" },
    { name: "Nguyễn Thị Trúc Anh", time: "12h20 ngày 30/11/2021" },
    { name: "Nguyễn Trung Toàn", time: "12h20 ngày 30/11/2021" },
    { name: "Phạm Hồng Ngọc", time: "12h20 ngày 30/11/2021" },
    { name: "Hồ Trung Hiếu", time: "12h20 ngày 30/11/2021" },
    { name: "Hoàng Duy Phước", time: "12h20 ngày 30/11/2021" },
    { name: "Trương Ngọc Nguyên", time: "12h20 ngày 30/11/2021" },
  ];

  return (
    <div className="notification-dropdown" style={{ position: 'absolute'}}> 
      <div className="notification-dropdown-header">Thông báo</div>
      <div className="notification-dropdown-content">
        {notifications.map((item, index) => (
          <div className="notification-item" key={index}>
            <strong>Người dùng: {item.name}</strong><br />
            <span>Thời gian nhận số: {item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
