import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchLogs } from "../../redux/logSlice"; // Adjusted to fetch logs instead of users
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import "./UserLog.css";

interface Log {
  id: string;
  username: string;
  time: string;
  ip: string;
  action: string;
}

const MainLog: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list: logs, loading, error } = useSelector(
    (state: RootState) => state.logs // Using logs state
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date("2021-10-10")
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date("2021-10-18")
  );

  useEffect(() => {
    dispatch(fetchLogs()); // Fetch logs instead of users
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredLogs = logs.filter((log: Log) => {
    const matchesSearch =
      (log.username &&
        log.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.ip &&
        log.ip.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.action &&
        log.action.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2>Danh sách tài khoản</h2>
      <div className="accounts-container">
        <div className="accounts-filters">
          <div className="filter-item">
            <label>Chọn thời gian</label>
            <div className="date-picker">
              {/* Trường nhập ngày bắt đầu */}
              <div className="date-input">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) =>
                    setStartDate(date ?? undefined)
                  }
                  selectsStart
                  dateFormat="dd/MM/yyyy"
                  className="custom-input-with-icon"
                  placeholderText="Ngày bắt đầu"
                  showPopperArrow={false}
                />
              </div>
              <img
                src="/img/arrow-right.png"
                alt="Arrow"
                className="arrow-icon"
              />
              {/* Trường nhập ngày kết thúc */}
              <div className="date-input">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) =>
                    setEndDate(date ?? undefined)
                  }
                  selectsEnd
                  dateFormat="dd/MM/yyyy"
                  className="custom-input-with-icon"
                  placeholderText="Ngày kết thúc"
                  showPopperArrow={false}
                />
              </div>
            </div>
          </div>
          <div className="filter-item">
            <label>Từ khóa</label>
            <input
              className="search"
              type="text"
              style={{ color: "#A9A9B0", backgroundColor: "white" }}
              placeholder="Nhập từ khóa"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <table className="log-table" style={{ width: "94.5%", marginLeft: "10px" }}>
        <thead>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Thời gian tác động</th>
            <th>IP thực hiện</th>
            <th>Thao tác thực hiện</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log: Log) => (
            <tr key={log.id}>
              <td>{log.username}</td>
              <td>{log.time}</td>
              <td>{log.ip}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="log-pagination">
        <span className="log-pagination-arrow">
          <img
            src="/img/arrow.png"
            alt="Previous"
            className="log-arrow-icon"
          />
        </span>
        <span className="log-pagination-page active">1</span>
        <span className="log-pagination-page">2</span>
        <span className="log-pagination-page">3</span>
        <span className="log-pagination-dots">4</span>
        <span className="log-pagination-dots">5</span>
        <span className="log-pagination-dots">..</span>
        <span className="log-pagination-page">10</span>
        <span className="log-pagination-arrow">
          <img
            src="/img/right.png"
            alt="Next"
            className="log-arrow-icon"
          />
        </span>
      </div>
    </>
  );
};

export default MainLog;
