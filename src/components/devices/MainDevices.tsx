import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import "./MainDevices.css";

// Định nghĩa kiểu dữ liệu Device
interface Device {
  id: string;
  name: string;
  ip: string;
  status: string;
  connection: string;
  service: string;
}

const MainDevices: React.FC = () => {
  const [deviceStatus, setDeviceStatus] = useState<string>("Tất cả");
  const [connectionStatus, setConnectionStatus] = useState<string>("Tất cả");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Lấy dữ liệu từ Firestore
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "devices"));
        const devicesData: Device[] = [];
        querySnapshot.forEach((doc) => {
          const deviceData = doc.data();
          devicesData.push({ id: doc.id, ...deviceData } as Device);
        });
        setDevices(devicesData);
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy dữ liệu từ Firebase");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

    // Sắp xếp danh sách thiết bị theo số trong ID
    const sortedDevices = devices.sort((a, b) => {
      // Lấy phần số từ chuỗi 'KIO_01', 'KIO_08', etc.
      const numA = parseInt(a.id.replace('KIO_', ''), 10);
      const numB = parseInt(b.id.replace('KIO_', ''), 10);
  
      // Sắp xếp theo giá trị số
      return numA - numB;
    });

  const filteredDevices = devices.filter(
    (device) =>
      (deviceStatus === "Tất cả" || device.status === deviceStatus) &&
      (connectionStatus === "Tất cả" ||
        device.connection === connectionStatus) &&
      ((typeof device.name === "string" && device.name.includes(searchTerm)) ||
        (typeof device.id === "string" && device.id.includes(searchTerm))) // Kiểm tra kiểu dữ liệu
  );
  
  // Mở rộng hoặc thu gọn nội dung dịch vụ sử dụng
  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Kiểm tra dữ liệu đang tải
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  // Kiểm tra lỗi
  if (error) {
    return <p>{error}</p>;
  }
  const handleAddDeviceClick = () => {
    navigate('/add-devices'); 
  };

  return (
    <div className="devices-container">
      <h2>Danh Sách Thiết Bị</h2>

      <div className="devices-buttons-section">
            <button className="devices-add" onClick={handleAddDeviceClick}>
              <img src="/img/btn-add.png" alt="" className="devices-add-icon" />
              Thêm thiết bị
            </button>
      </div>

      <div className="devices-filter-section">
        <div className="devices-filter-group">
          <label htmlFor="deviceStatus">Trạng thái hoạt động</label>
          <select
            id="deviceStatus"
            value={deviceStatus}
            onChange={(e) => setDeviceStatus(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Ngừng hoạt động">Ngừng hoạt động</option>
          </select>
        </div>

        <div className="devices-filter-group">
          <label htmlFor="connectionStatus">Trạng thái kết nối</label>
          <select
            id="connectionStatus"
            value={connectionStatus}
            onChange={(e) => setConnectionStatus(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Kết nối">Kết nối</option>
            <option value="Mất kết nối">Mất kết nối</option>
          </select>
        </div>

        <div className="devices-filter-group">
          <label htmlFor="searchTerm">Từ khoá</label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Nhập từ khóa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="devices-table">
        <colgroup>
          <col style={{ width: "100px" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "300px" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "80px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Mã thiết bị</th>
            <th>Tên thiết bị</th>
            <th>Địa chỉ IP</th>
            <th>Trạng thái hoạt động</th>
            <th>Trạng thái kết nối</th>
            <th>Dịch vụ sử dụng</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device, index) => (
            <tr key={index}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.ip}</td>
              <td>
                <span
                  className={
                    typeof device.status === "string" &&
                    device.status.trim().localeCompare("Hoạt động") === 0
                      ? "status actives"
                      : "status inactive"
                  }
                >
                  {device.status}
                </span>
              </td>

              <td>
                <span
                  className={
                    typeof device.connection === "string" &&
                    device.connection.trim().localeCompare("Kết nối") === 0
                      ? "connection connected"
                      : "connection disconnected"
                  }
                >
                  {device.connection}
                </span>
              </td>

              <td>
                <div className="devices-service-container">
                  <span className="devices-service-short">
                    {expandedIndex === index
                      ? device.service
                      : typeof device.service === "string" &&
                        device.service.length > 40
                      ? device.service.substring(0, 40) + "... "
                      : device.service}
                  </span>
                  {typeof device.service === "string" &&
                    device.service.length > 40 && (
                      <div className="xem-them-container">
                        <span
                          className="xem-them"
                          onClick={() => handleToggleExpand(index)}
                        >
                          {expandedIndex === index ? "Thu gọn" : "Xem thêm"}
                        </span>
                      </div>
                    )}
                </div>
              </td>

              <td>
                <Link to={`/devices/${device.id}`}>Chi tiết</Link>
              </td>

              <td>
                <Link to={`/devices/update/${device.id}`}>Cập nhật</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="devices-pagination">
        <span className="devices-pagination-arrow">
          <img src="/img/arrow.png" alt="Previous" className="devices-arrow-icon" />
        </span>
        <span className="devices-pagination-page active">1</span>
        <span className="devices-pagination-page">2</span>
        <span className="devices-pagination-page">3</span>
        <span className="devices-pagination-dots">4</span>
        <span className="devices-pagination-dots">5</span>
        <span className="devices-pagination-dots">..</span>
        <span className="devices-pagination-page">10</span>
        <span className="devices-pagination-arrow">
          <img src="/img/right.png" alt="Next" className="devices-arrow-icon" />
        </span>
      </div>
    </div>
  );
};

export default MainDevices;
