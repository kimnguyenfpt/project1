import React, { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ServiceForm.css";

interface ServiceFormData {
  serviceCode: string;
  name: string;
  description: string;
  autoIncrement: boolean;
  startRange: string;
  endRange: string;
  prefix: boolean;
  prefixValue: string;
  suffix: boolean;
  suffixValue: string;
  resetDaily: boolean;
  status: string;
}

const ServiceForm: React.FC = () => {
  const [formData, setFormData] = useState<ServiceFormData>({
    serviceCode: "",
    name: "Khám tim mạch",
    description: "",
    autoIncrement: false,
    startRange: "0001",
    endRange: "9999",
    prefix: false,
    prefixValue: "0001",
    suffix: false,
    suffixValue: "0001",
    resetDaily: false,
    status: "Hoạt động",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    setError(null); // Reset lỗi mỗi khi submit

    try {
      // Kiểm tra mã dịch vụ có tồn tại hay không
      const docRef = doc(db, "services", formData.serviceCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Nếu mã dịch vụ đã tồn tại
        setError(`Mã dịch vụ ${formData.serviceCode} đã tồn tại!`);
        alert(`Mã dịch vụ ${formData.serviceCode} đã tồn tại!`);
      } else {
        // Nếu mã dịch vụ chưa tồn tại, thêm dịch vụ mới
        await setDoc(doc(db, "services", formData.serviceCode), formData);
        console.log("Document written with ID: ", formData.serviceCode);
        // Hiển thị thông báo thành công
        alert(`Dịch vụ với mã ${formData.serviceCode} đã được thêm thành công!`);
        // Chuyển hướng về trang /service sau khi thêm thành công
        navigate("/service");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Đã xảy ra lỗi khi thêm dịch vụ!");
      alert("Đã xảy ra lỗi khi thêm dịch vụ!");
    }
  };

  return (
    <>
      <h2>Quản lý dịch vụ</h2>
      <div className="service-form-container">
        <div className="service-header">
          <h2>Thông tin dịch vụ</h2>
        </div>
        <form className="service-form">
          <div className="service-form-group">
            <label htmlFor="service-code">
              Mã dịch vụ: <span className="required">*</span>
            </label>
            <input
              type="text"
              id="service-code"
              name="serviceCode"
              placeholder="Nhập mã dịch vụ"
              value={formData.serviceCode}
              onChange={handleChange}
            />
          </div>
          <div className="service-form-group full-height">
            <label htmlFor="service-description">Mô tả:</label>
            <textarea
              id="service-description"
              name="description"
              placeholder="Mô tả dịch vụ"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="service-form-group">
            <label htmlFor="service-name">
              Tên dịch vụ: <span className="required">*</span>
            </label>
            <input
              type="text"
              id="service-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <h3 style={{ color: "#FF7506", fontSize: "20px", marginBottom: "0" }}>
            Quy tắc cấp số
          </h3>

          <div className="service-rule-container">
            <div className="service-rule">
              <label>
                <input
                  type="checkbox"
                  name="autoIncrement"
                  checked={formData.autoIncrement}
                  onChange={handleChange}
                />
                Tăng tự động từ:
              </label>
              <input
                type="text"
                name="startRange"
                value={formData.startRange}
                onChange={handleChange}
                disabled={!formData.autoIncrement}
              />
              <span>đến</span>
              <input
                type="text"
                name="endRange"
                value={formData.endRange}
                onChange={handleChange}
                disabled={!formData.autoIncrement}
              />
            </div>

            <div className="service-rule">
              <label>
                <input
                  type="checkbox"
                  name="prefix"
                  checked={formData.prefix}
                  onChange={handleChange}
                />
                Prefix:
              </label>
              <input
                type="text"
                name="prefixValue"
                value={formData.prefixValue}
                onChange={handleChange}
                disabled={!formData.prefix}
              />
            </div>

            <div className="service-rule">
              <label>
                <input
                  type="checkbox"
                  name="suffix"
                  checked={formData.suffix}
                  onChange={handleChange}
                />
                Surfix:
              </label>
              <input
                type="text"
                name="suffixValue"
                value={formData.suffixValue}
                onChange={handleChange}
                disabled={!formData.suffix}
              />
            </div>

            <div className="service-rule">
              <label>
                <input
                  type="checkbox"
                  name="resetDaily"
                  checked={formData.resetDaily}
                  onChange={handleChange}
                />
                Reset mỗi ngày
              </label>
            </div>
          </div>

          <p className="form-note">
            <span className="required-asterisk">*</span> Là trường thông tin bắt buộc
          </p>
        </form>
      </div>
      <div className="form-actions">
        <button type="button" className="add-cancel-button" onClick={() => navigate("/service")}>
          Hủy bỏ
        </button>
        <button type="button" className="add-submit-button" onClick={handleSubmit}>
          Thêm dịch vụ
        </button>
      </div>
    </>
  );
};

export default ServiceForm;
