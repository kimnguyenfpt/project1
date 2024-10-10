import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDropdown";
import "./NewNumber.css";

const NewNumber: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>(""); // Thêm kiểu string
  const [number, setNumber] = useState<string>(""); // Số thứ tự là string
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Boolean kiểm soát modal
  const navigate = useNavigate();

  const handleSelectService = (value: string) => {
    setSelectedService(value);
  };

  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước
  };

  const handlePrintNumber = () => {
    if (selectedService) {
      const newNumber = Math.floor(Math.random() * 1000000).toString(); // Tạo số thứ tự ngẫu nhiên
      setNumber(newNumber);
      setIsModalOpen(true); // Mở modal
    } else {
      alert("Vui lòng chọn dịch vụ trước khi in số!"); // Thông báo nếu chưa chọn dịch vụ
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal khi bấm nút x
  };

  return (
    <div className="new-number-container">
      <h1>Cấp số mới</h1>
      <p>Dịch vụ khách hàng lựa chọn</p>
      <CustomDropdown
        options={["Khám tim mạch", "Khám sản - phụ khoa", "Khám răng hàm mặt"]}
        onSelect={handleSelectService}
        placeholder="Chọn dịch vụ"
      />
      <div className="buttons">
        <button className="cancel-btn" onClick={handleCancel}>
          Hủy bỏ
        </button>
        <button className="print-btn" onClick={handlePrintNumber}>
          In số
        </button>
      </div>

      {/* Modal hiển thị số thứ tự */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h5>Số thứ tự được cấp</h5>
            <h1>{number}</h1>
            <p className="modal-service">DV: {selectedService}<span style={{marginLeft: "2px"}}>(Tại quầy số 1)</span></p>
            <div className="modal-footer">
              <p>Thời gian cấp: 09:30 11/10/2021</p>
              <p>Hạn sử dụng: 17:30 11/10/2021</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewNumber;
