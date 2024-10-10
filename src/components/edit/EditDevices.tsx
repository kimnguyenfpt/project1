import React, { useState, useEffect } from "react";
import { db } from "../../firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./EditDevices.css";
import { useParams, useNavigate } from "react-router-dom";

interface DeviceData {
  name: string;
  ip: string;
  service: string[];
  type: string;
  username: string;
  password: string;
}

const EditDevices: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();

  const availableServices: string[] = [
    "Khám tim mạch",
    "Khám sản phụ khoa",
    "Khám răng hàm mặt",
    "Khám tai mũi họng",
    "Khám hô hấp",
    "Khám tổng quát",
  ];

  const [deviceCode, setDeviceCode] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  const [ipAddress, setIpAddress] = useState<string>("");
  const [serviceUsed, setServiceUsed] = useState<string[]>([...availableServices]);
  const [deviceType, setDeviceType] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!deviceId) {
      setError("Thiết bị không tồn tại.");
      return;
    }

    const loadDeviceData = async () => {
      try {
        const deviceRef = doc(db, "devices", deviceId);
        const docSnapshot = await getDoc(deviceRef);
        if (docSnapshot.exists()) {
          const deviceData = docSnapshot.data() as DeviceData;
          setDeviceCode(deviceId);
          setDeviceName(deviceData?.name || "");
          setIpAddress(deviceData?.ip || "");

          let services: string[] = [];
          if (Array.isArray(deviceData?.service)) {
            services = deviceData?.service;
          } else if (typeof deviceData?.service === "string") {
            services = (deviceData?.service as string).split(", ").filter(Boolean);
          }

          setServiceUsed(services);

          setDeviceType(deviceData?.type || "");
          setUsername(deviceData?.username || "");
          setPassword(deviceData?.password || "");
        } else {
          setError("Thiết bị không tồn tại.");
        }
      } catch (error) {
        console.error("Error fetching device data:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu thiết bị.");
      }
    };

    loadDeviceData();
  }, [deviceId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!deviceId) {
      setError("Thiết bị không tồn tại.");
      return;
    }

    try {
      const deviceRef = doc(db, "devices", deviceId);

      const serviceString = serviceUsed.join(", ") + ",";

      await updateDoc(deviceRef, {
        name: deviceName,
        ip: ipAddress,
        service: serviceString,
        type: deviceType,
        username,
        password,
        connection: "Kết nối",
        status: "Hoạt động",
      });
      alert("Thiết bị đã được cập nhật thành công!");

      navigate("/devices");
    } catch (error) {
      setError("Có lỗi xảy ra khi cập nhật thiết bị.");
      console.error("Error updating device:", error);
    }
  };

  const removeService = (service: string) => {
    setServiceUsed((prevServices) => prevServices.filter((s) => s !== service));
  };

  return (
    <>
      <h2>Cập nhật thiết bị</h2>
      {error && <p className="error-message">{error}</p>}
      {!error && (
        <div className="device-form-container">
          <h3>Thông tin thiết bị</h3>
          <form id="device-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
              <label htmlFor="deviceCode">Mã thiết bị <span className="required">*</span></label>
                <input
                  className="add"
                  type="text"
                  value={deviceCode}
                  onChange={(e) => setDeviceCode(e.target.value)}
                  placeholder="Nhập mã thiết bị"
                  required
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="deviceType">Loại thiết bị <span className="required">*</span></label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  required
                >
                  <option value="">Chọn loại thiết bị</option>
                  <option value="Kiosk">Kiosk</option>
                  <option value="Display counter">Display counter</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deviceName">Tên thiết bị <span className="required">*</span></label>
                <input
                  className="add"
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="Nhập tên thiết bị"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập <span className="required">*</span></label>
                <input
                  className="add"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tài khoản"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ipAddress">Địa chỉ IP <span className="required">*</span></label>
                <input
                  className="add"
                  type="text"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="Nhập địa chỉ IP"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu <span className="required">*</span></label>
                <input
                  className="add"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="serviceUsed">Dịch vụ sử dụng <span className="required">*</span></label>
              <div className="service-box">
                <div className="selected-services">
                  {serviceUsed.map((service, index) => (
                    <div className="tag" key={index}>
                      <span>{service}</span>
                      <span
                        style={{ cursor: "pointer", paddingLeft: "10px", color: "#fff", fontSize: "20px" }}
                        onClick={() => removeService(service)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="form-note">
              <span className="required-asterisk">*</span> Là trường thông tin bắt buộc
            </p>
          </form>
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="add-cancel-button"
          onClick={() => navigate("/devices")}
        >
          Hủy bỏ
        </button>
        <button type="submit" form="device-form" className="add-submit-button">
          Cập nhật
        </button>
      </div>
    </>
  );
};

export default EditDevices;
