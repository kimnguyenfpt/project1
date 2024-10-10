import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNumbers } from "../../redux/numberSlice";
import { RootState, AppDispatch } from "../../redux/store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MainReport.css";

const MainReport: React.FC = () => {
  const [filters, setFilters] = useState({
    startDate: new Date("2021-10-10"),
    endDate: new Date("2021-10-18"),
  });

  const { data, status, error } = useSelector((state: RootState) => state.numbers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNumbers());
    }
  }, [status, dispatch]);


  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setFilters((prev) => ({
        ...prev,
        startDate: date,
      }));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setFilters((prev) => ({
        ...prev,
        endDate: date,
      }));
    }
  };


  return (
    <div className="queue-management">
      <div className="report-filter-group" style={{marginBottom: "10px"}}>
        <label>Chọn thời gian</label>
        <div className="report-date-picker-group">
          <DatePicker
            selected={filters.startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            className="custom-date-picker"
          />
          <img src="/img/arrow-right.png" alt="arrow-right" className="date-arrow" />
          <DatePicker
            selected={filters.endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            className="custom-date-picker"
          />
        </div>
      </div>

      {/* Hiển thị bảng */}
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>{error}</p>
      ) : (
        <table className="main-report-table">
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Tên dịch vụ</th>
              <th>Thời gian cấp</th>
              <th>Trạng thái</th>
              <th>Nguồn cấp</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{item.id}</td>
                  <td>{item.service}</td>
                  <td>{item.issueTime}</td>
                  <td>
                    <div className="status-indicator">
                      <span
                        className={`status-circle ${
                          item.status.trim().localeCompare("Đang chờ") === 0
                            ? "status-waiting"
                            : item.status.trim().localeCompare("Đã sử dụng") === 0
                            ? "status-used"
                            : item.status.trim().localeCompare("Bỏ qua") === 0
                            ? "status-skipped"
                            : ""
                        }`}
                      ></span>
                      {item.status}
                    </div>
                  </td>
                  <td>{item.source}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="number-pagination">
        <span className="number-pagination-arrow">
          <img src="/img/arrow.png" alt="Previous" className="number-arrow-icon" />
        </span>
        <span className="number-pagination-page active">1</span>
        <span className="number-pagination-page">2</span>
        <span className="number-pagination-page">3</span>
        <span className="number-pagination-dots">...</span>
        <span className="number-pagination-page">10</span>
        <span className="number-pagination-arrow">
          <img src="/img/right.png" alt="Next" className="number-arrow-icon" />
        </span>
      </div>
      <div className="report-buttons-section">
            <button className="report-add">
              <img src="/img/download.png" alt="" className="report-add-icon" />
              Tải về
            </button>
          </div>
    </div>
  );
};

export default MainReport;
