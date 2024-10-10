import React, { useState } from "react";
import { db } from "../../firebase/FirebaseConfig"; 
import {  setDoc, doc, getDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import "./AddDevices.css";

const AddDevices: React.FC = () => {
  const [deviceCode, setDeviceCode] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [serviceUsed, setServiceUsed] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);


  
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/devices');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Đảm bảo deviceCode là duy nhất
      const deviceRef = doc(db, "devices", deviceCode);

      // Kiểm tra xem tài liệu có tồn tại không trước khi thêm mới
      const docSnapshot = await getDoc(deviceRef);
      if (docSnapshot.exists()) {
        alert("Mã thiết bị đã tồn tại!");
        return;
      }

      // Sử dụng setDoc để thêm thiết bị mới
      await setDoc(deviceRef, {
        name: deviceName,
        ip: ipAddress,
        service: serviceUsed,
        type: deviceType,
        username,
        password,
        connection: "Kết nối", 
        status: "Hoạt động", 
      });

      // Reset form sau khi thêm thành công
      setDeviceCode("");
      setDeviceName("");
      setIpAddress("");
      setServiceUsed("");
      setDeviceType("");
      setUsername("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError("Có lỗi xảy ra khi thêm thiết bị");
      console.error("Có lỗi xảy ra khi thêm thiết bị:", error);
    }
  };

  return (
    <>
      <h2>Quản lý thiết bị</h2>
      <div className="device-form-container">
        <h3>Thông tin thiết bị</h3>
        <form id="device-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
            <label htmlFor="service-code">
              Mã thiết bị: <span className="required">*</span>
            </label>
              <input
                className="add"
                type="text"
                value={deviceCode}
                onChange={(e) => setDeviceCode(e.target.value)}
                placeholder="Nhập mã thiết bị"
                required
              />
            </div>
            <div className="form-group">
            <label htmlFor="service-code">
              Loại thiết bị: <span className="required">*</span>
            </label>
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
            <label htmlFor="service-code">
              Tên thiết bị: <span className="required">*</span>
            </label>
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
            <label htmlFor="service-code">
              Tên đăng nhập: <span className="required">*</span>
            </label>
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
            <label htmlFor="service-code">
              Địa chỉ IP: <span className="required">*</span>
            </label>
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
            <label htmlFor="service-code">
              Mật khẩu: <span className="required">*</span>
            </label>
              <input
                className="add"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
          <label htmlFor="service-code">
              Dịch vụ sử dụng: <span className="required">*</span>
            </label>
            <input
              className="add"
              type="text"
              value={serviceUsed}
              onChange={(e) => setServiceUsed(e.target.value)}
              placeholder="Nhập dịch vụ sử dụng"
              required
            />
          </div>

          {/* Note section */}
          <p className="form-note">
            <span className="required-asterisk">*</span> Là trường thông tin bắt
            buộc
          </p>
        </form>
      </div>
      {/* Buttons moved outside the form */}
      <div className="form-actions" onClick={handleCancel}>
        <button type="button" className="add-cancel-button">
          Hủy bỏ
        </button>
        <button type="submit" form="device-form" className="add-submit-button">
          Thêm thiết bị
        </button>
      </div>
    </>
  );
};

export default AddDevices;
