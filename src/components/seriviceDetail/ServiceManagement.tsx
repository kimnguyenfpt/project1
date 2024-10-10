import React, { useState, useEffect } from "react";
import "./ServiceManagement.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../firebase/FirebaseConfig"; // Đường dẫn tới file firebaseConfig.ts của bạn
import { doc, getDoc } from "firebase/firestore"; // Import các hàm cần thiết từ Firestore
import { useNavigate } from "react-router-dom";

const ServiceManagement: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2021-10-10")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2021-10-18"));
  const [keyword, setKeyword] = useState<string>("");

  const [serviceInfo, setServiceInfo] = useState<any>(null); // Để lưu thông tin dịch vụ
  const [statuses, setStatuses] = useState<any[]>([]); // Để lưu danh sách trạng thái

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const docRef = doc(db, "services", "201");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Dữ liệu từ Firestore:", data); // Kiểm tra dữ liệu
          setServiceInfo(data);
          setStatuses(data.statuses || []);
        } else {
          console.log("Không có document nào!");
        }
      } catch (error) {
        console.error("Lỗi khi lấy document:", error);
      }
    };

    fetchServiceData();
  }, []);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const navigate = useNavigate();
  return (
    <>
    <h2 style={{fontSize: "24px", fontWeight: "bold", marginLeft: "25px"}}>Quản lý dịch vụ</h2>
    <div className="service-management-container">
      {/* Left Panel */}
      <div className="service-info">
        <h2>Thông tin dịch vụ</h2>
        {serviceInfo ? (
          <div className="service-details">
            <p>
              <strong>Mã dịch vụ:</strong> {serviceInfo.serviceCode}
            </p>
            <p>
              <strong>Tên dịch vụ:</strong> {serviceInfo.name}
            </p>
            <p>
              <strong>Mô tả:</strong> {serviceInfo.description}
            </p>
          </div>
        ) : (
          <p>Đang tải thông tin dịch vụ...</p>
        )}

        <div className="numbering-rules">
          <h3>Quy tắc cấp số</h3>
          {serviceInfo && (
            <>
              <div className="rule-item">
                <label className="rule-label">
                  <strong>Tăng tự động:</strong>
                </label>
                <div className="input-group">
                  <input
                    id="auto-increment-start"
                    className="small-input"
                    type="text"
                    value={serviceInfo.startRange}
                    readOnly
                  />
                  <span className="to-label">đến</span>
                  <input
                    id="auto-increment-end"
                    className="small-input"
                    type="text"
                    value={serviceInfo.endRange}
                    readOnly
                  />
                </div>
              </div>
              <div className="rule-item">
                <label className="rule-label">
                  <strong>Prefix:</strong>
                </label>
                <input
                  id="prefix"
                  className="small-input"
                  type="text"
                  value={serviceInfo.prefixValue}
                  readOnly
                />
              </div>
              <div className="rule-item">
                <p className="reset-label">Reset mỗi ngày</p>
              </div>
              <div className="rule-item">
                <p className="example-label">Ví dụ: 201-2001</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="service-management-table">
        <div className="new-filter-section">
          <div className="select-container">
            <label htmlFor="status-filter">Trạng thái</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Đã hoàn thành">Đã hoàn thành</option>
              <option value="Đang thực hiện">Đang thực hiện</option>
              <option value="Vắng">Vắng</option>
            </select>
          </div>

          <div className="date-picker-container">
            <label htmlFor="date-picker">Chọn ngày</label>
            <div className="date-picker-wrapper">
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="mana-date-picker"
              />
              <img src="/img/arrow-right.png" alt="" className="date-arrow" />
              <DatePicker
                id="end-date"
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="mana-date-picker"
              />
            </div>
          </div>

          <div className="keyword-input">
            <label htmlFor="keyword-search">Từ khóa</label>
            <input
              id="keyword-search"
              className="custom-keyword-input"
              type="text"
              placeholder="Nhập từ khóa"
              value={keyword}
              onChange={handleKeywordChange}
            />
          </div>
        </div>

        <table className="service-table">
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {statuses.length > 0 ? (
              statuses.map((statusItem, index) => {
                const status = statusItem.status.toLowerCase(); 
                let statusClass = "";

                if (status.localeCompare("đã hoàn thành") === 0) {
                  statusClass = "complete";
                } else if (status.localeCompare("đang thực hiện") === 0) {
                  statusClass = "in-progress";
                } else if (status.localeCompare("vắng") === 0) {
                  statusClass = "absent";
                }

                console.log(
                  "Trạng thái:",
                  statusItem.status,
                  "Gán class:",
                  statusClass
                ); 

                return (
                  <tr key={index}>
                    <td>{statusItem.stt}</td>
                    <td>
                      <span className={`service-status ${statusClass}`}>
                        {statusItem.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={2}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="service-pagination">
          <span className="service-pagination-arrow">
            <img src="/img/arrow.png" alt="Previous" className="arrow-icon" />
          </span>
          <span className="service-pagination-page active">1</span>
          <span className="service-pagination-page">2</span>
          <span className="service-pagination-page">3</span>
          <span className="service-pagination-dots">4</span>
          <span className="service-pagination-dots">5</span>
          <span className="service-pagination-dots">..</span>
          <span className="service-pagination-page">10</span>
          <span className="service-pagination-arrow">
            <img src="/img/right.png" alt="Next" className="arrow-icon" />
          </span>
        </div>
      </div>

      {/* Two Buttons */}
      <div className="service-buttons-section">
        <button className="primary-btn custom-btn">
          <img src="/img/Edit.png" alt="Edit" className="img-button" />
          Cập nhật danh sách
        </button>

        <hr />

        <button 
          className="primary-btn custom-btn" 
          onClick={() => navigate("/service")}
        >
          <img src="/img/back.png" alt="Back" className="img-button" />
          Quay lại
        </button>
      </div>
    </div>
    </>
  );
};

export default ServiceManagement;
