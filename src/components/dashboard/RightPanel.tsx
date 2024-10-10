import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../assets/css/RightPanel.css';
import Header from '../header/Header';

const RightPanel: React.FC = () => {
    const [date, setDate] = useState<Date | null>(new Date());

    const onChange = (newDate: Date | [Date | null, Date | null] | null) => {
        if (newDate instanceof Date) {
            // Handle single date selection and set it as-is
            setDate(newDate);
        } else if (Array.isArray(newDate) && newDate[0] instanceof Date) {
            // Handle a date range and use the first date
            setDate(newDate[0]);
        } else {
            // Handle the case where the value is null
            setDate(null);
        }
    };
    
    return (
        <div className="right-panel">
            <Header pageTitle="" />
            <div className="overview-section">
                <h2 className="overview-title">Tổng quan</h2>
                
                {/* Card 1 - Thiết bị */}
                <div className="card">
                    <div className="card-content">
                        <img src="./img/box1.png" alt="" />
                        <div className="device-stats">
                            <span className="number">4.221</span>
                            <span className="label-icon">
                                <img src="./img/box1a.png" alt="icon" className="icon-image" /> Thiết bị
                            </span>
                        </div>
                        <div className="device-info">
                            <div className="info-item">
                                <span className="active-devices">Đang hoạt động</span>
                                <span className="active-number orange-text">3.799</span>
                            </div>
                            <div className="info-item">
                                <span className="inactive-devices">Ngừng hoạt động</span>
                                <span className="active-number orange-text">422</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Card 2 - Dịch vụ */}
                <div className="card">
                    <div className="card-content">
                        <img src="./img/box2.png" alt="" />
                        <div className="device-stats">
                            <span className="number">276</span>
                            <span className="label-icon blue">
                                <img src="./img/blue.png" alt="icon" className="icon-image" /> Dịch vụ
                            </span>
                        </div>
                        <div className="device-info">
                            <div className="info-item">
                                <span className="active-devices">Đang hoạt động</span>
                                <span className="blue-text">210</span>
                            </div>
                            <div className="info-item">
                                <span className="inactive-devices">Ngừng hoạt động</span>
                                <span className="blue-text">66</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Card 3 - Cấp số */}
                <div className="card">
                    <div className="card-content">
                        <img src="./img/box3.png" alt="" />
                        <div className="device-stats">
                            <span className="number">4.221</span>
                            <span className="label-icon green">
                                <img src="./img/green.png" alt="icon" className="icon-image" /> Cấp số
                            </span>
                        </div>
                        <div className="device-info">
                            <div className="info-item">
                                <span className="green-active-devices">Đã sử dụng</span>
                                <span className="green-text">3.721</span>
                            </div>
                            <div className="info-item">
                                <span className="green-active-devices">Đang chờ</span>
                                <span className="green-text">486</span>
                            </div>
                            <div className="info-item">
                                <span className="green-active-devices">Bỏ qua</span>
                                <span className="green-text">32</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="calendar-section">
                <Calendar
                    onChange={onChange}
                    value={date}  // The selected date
                    locale="en-EN"
                    className="custom-calendar"
                    prevLabel="‹"
                    nextLabel="›"
                    prev2Label={null}
                    next2Label={null}
 
                    navigationLabel={({ date }) => {
                        const day = date.getDate(); 
                        const month = date.toLocaleString('default', { month: 'short' });
                        const year = date.getFullYear(); 
                        return `${day} ${month} ${year}`; 
                    }}
                    activeStartDate={date || new Date()} 
                />
                </div>
            </div>
        </div>
    );
};

export default RightPanel;
