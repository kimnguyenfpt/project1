import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNumbers } from "../../redux/numberSlice";
import { RootState, AppDispatch } from "../../redux/store"; // Import AppDispatch
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MainNumber.css";

const MainNumber: React.FC = () => {
  const [filters, setFilters] = useState({
    serviceName: "Tất cả",
    status: "Tất cả",
    source: "Tất cả",
    startDate: new Date("2021-10-10"),
    endDate: new Date("2021-10-18"),
    keyword: "",
  });

  // Lấy dữ liệu từ Redux store
  const { data, status, error } = useSelector((state: RootState) => state.numbers);
  const dispatch = useDispatch<AppDispatch>(); // Sử dụng AppDispatch
  const navigate = useNavigate();

  // Fetch data khi component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNumbers()); // dispatch với kiểu AppDispatch
    }
  }, [status, dispatch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleAddNumber = () => {
    navigate("/add-number");
  };

  // Lọc dữ liệu theo trạng thái và các bộ lọc khác
  const filteredData = data.filter((item) => {
    const statusMatch =
      filters.status === "Tất cả" || item.status.trim().localeCompare(filters.status) === 0;
    const serviceMatch =
      filters.serviceName === "Tất cả" || item.service.trim().localeCompare(filters.serviceName) === 0;
    const sourceMatch =
      filters.source === "Tất cả" || item.source.trim().localeCompare(filters.source) === 0;
    return statusMatch && serviceMatch && sourceMatch;
  });

  return (
    <div className="queue-management">
      <h2>Quản lý cấp số</h2>

      {/* Bộ lọc */}
      <div className="number-filters">
        <div className="number-filter-group">
          <label>Tên dịch vụ</label>
          <select
            name="serviceName"
            value={filters.serviceName}
            onChange={handleFilterChange}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Khám tim mạch">Khám tim mạch</option>
            <option value="Khám sản - Phụ Khoa">Khám sản - Phụ khoa</option>
            <option value="Khám tai mũi họng">Khám tai mũi họng</option>
            <option value="Khám hô hấp">Khám hô hấp</option>
            <option value="Khám tổng quát">Khám tổng quát</option>
          </select>
        </div>

        <div className="number-filter-group">
          <label>Tình trạng</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đang chờ">Đang chờ</option>
            <option value="Đã sử dụng">Đã sử dụng</option>
            <option value="Bỏ qua">Bỏ qua</option>
          </select>
        </div>

        <div className="number-filter-group">
          <label>Nguồn cấp</label>
          <select
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Kiosk">Kiosk</option>
            <option value="Hệ thống">Hệ thống</option>
          </select>
        </div>

        <div className="number-filter-group">
          <label>Chọn thời gian</label>
          <div className="date-picker-group">
            <DatePicker
              selected={filters.startDate}
              onChange={handleStartDateChange}
              dateFormat="dd/MM/yyyy"
            />
            <img src="/img/arrow-right.png" alt="arrow-right" />
            <DatePicker
              selected={filters.endDate}
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        <div className="number-filter-group">
          <label>Từ khóa</label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              className="number-filter-input"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Nhập từ khóa"
            />
            <div className="search-btn">
              <img src="/img/search.png" alt="search" />
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị bảng */}
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'failed' ? (
        <p>{error}</p>
      ) : (
        <table className="main-number-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khách hàng</th>
              <th>Tên dịch vụ</th>
              <th>Thời gian cấp</th>
              <th>Hạn sử dụng</th>
              <th>Trạng thái</th>
              <th>Nguồn cấp</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.customerName}</td>
                  <td>{item.service}</td>
                  <td>{item.issueTime}</td>
                  <td>{item.expiryTime}</td>
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
                  <td>
                    <Link to={`/numbers/${item.id}`}>Chi tiết</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>Không có dữ liệu</td>
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
        <span className="number-pagination-dots">4</span>
        <span className="number-pagination-dots">5</span>
        <span className="number-pagination-dots">..</span>
        <span className="number-pagination-page">10</span>
        <span className="number-pagination-arrow">
          <img src="/img/right.png" alt="Next" className="number-arrow-icon" />
        </span>
      </div>

      <div className="number-buttons-section">
        <button className="number-primary-btn" onClick={handleAddNumber}>
          <img src="/img/btn-add.png" alt="Edit" className="img-button" />
          Cấp số mới
        </button>
      </div>
    </div>
  );
};

export default MainNumber;
