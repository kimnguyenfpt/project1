import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FilterComponent.css";

const FilterComponent = () => {
  const [statusService, setStatusService] = useState("Tất cả");
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2021-10-10")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2021-10-18"));
  const [keywordService, setKeywordService] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusOptions = ["Tất cả", "Hoạt động", "Ngừng hoạt động"];

  const handleStatusChange = (option: string) => {
    setStatusService(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="filter-container">
      {/* Trạng thái hoạt động */}
      <div className="filter-item">
        <label>Trạng thái hoạt động</label>
        <select
          className="status-select"
          value={statusService}
          onChange={(e) => setStatusService(e.target.value)}
          style={{ color: "#535261", backgroundColor: "white" }}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Hoạt động">Hoạt động</option>
          <option value="Ngừng hoạt động">Ngừng hoạt động</option>
        </select>
      </div>

      <div className="filter-item">
        <label>Chọn thời gian</label>
        <div className="date-picker">
          {/* Trường nhập ngày bắt đầu */}
          <div className="date-input">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              selectsStart
              dateFormat="dd/MM/yyyy"
              className="custom-input-with-icon"
              placeholderText="Ngày bắt đầu"
              showPopperArrow={false}
            />
          </div>
          <img src="/img/arrow-right.png" alt="Arrow" className="arrow-icon" />
          {/* Trường nhập ngày kết thúc */}
          <div className="date-input">
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              selectsEnd
              dateFormat="dd/MM/yyyy"
              className="custom-input-with-icon"
              placeholderText="Ngày kết thúc"
              showPopperArrow={false}
            />
          </div>
        </div>
      </div>

      {/* Từ khóa */}
      <div className="filter-item">
        <label>Từ khóa</label>
        <input
          className="search"
          type="text"
          value={keywordService}
          onChange={(e) => setKeywordService(e.target.value)}
          style={{ color: "#A9A9B0", backgroundColor: "white" }}
          placeholder="Nhập từ khóa"
        />
      </div>
    </div>
  );
};

export default FilterComponent;
