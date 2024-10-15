import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../firebase/FirebaseConfig"; // Import your Firestore configuration
import CustomDropdown from "./CustomDropdown";
import "./NewNumber.css";

const NewNumber: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [number, setNumber] = useState<number>(2010000); // Base number for sequence
  const [customerName, setCustomerName] = useState<string>(""); // New state for customer name
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Đang chờ"); // Status set to "Đang chờ"
  const navigate = useNavigate();

  // Fetch the latest number from Firestore when the component mounts
  useEffect(() => {
    const fetchLatestNumber = async () => {
      try {
        const docRef = doc(db, "system", "latestNumber");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const latestNumber = docSnap.data().number;
          setNumber(latestNumber); // Set the latest number as the current base number
        } else {
          console.log("No latest number found, using default starting number.");
        }
      } catch (error) {
        console.error("Error fetching latest number:", error);
      }
    };

    fetchLatestNumber();
  }, []);

  const handleSelectService = (value: string) => {
    setSelectedService(value);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePrintNumber = async () => {
    if (selectedService && customerName) {
      const newNumber = number + 1; // Increment the number
      setNumber(newNumber);
      setIsModalOpen(true);

      // Get the current time (issue time)
      const issueTime = getCurrentFormattedTime();

      // Calculate expiry time (2 hours after the issue time)
      const expiryTime = getExpiryTime(2); // Add 2 hours

      // Save the new number and update the latest number in Firestore
      try {
        // Save the new number as a document
        await setDoc(doc(db, "numbers", newNumber.toString()), {
          customerName,
          service: selectedService,
          number: newNumber,
          status: "Đang chờ",
          issueTime,
          expiryTime,
          source: "Hệ thống" // Add source as "Hệ thống"
        });

        // Update the latest number in Firestore
        await setDoc(doc(db, "system", "latestNumber"), {
          number: newNumber
        });

        // Notify the user and navigate to /number to view
        alert("Số thứ tự được cấp thành công!");
        navigate("/number"); // Redirect to the /number route
        window.location.reload();
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    } else {
      alert("Vui lòng chọn dịch vụ và nhập tên khách hàng trước khi in số!");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Format the current time in 24-hour format
  const getCurrentFormattedTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = now.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  // Calculate the expiry time by adding hours to the current time
  const getExpiryTime = (hoursToAdd: number) => {
    const now = new Date();
    now.setHours(now.getHours() + hoursToAdd);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = now.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  return (
    <div className="new-number-container">
      <h1>Cấp số mới</h1>
      <p>Dịch vụ khách hàng lựa chọn</p>
      <CustomDropdown
        options={["Khám tim mạch", "Khám sản - phụ khoa", "Khám răng hàm mặt", "Khám tai mũi họng", "Khám hô hấp", "Khám tổng quát"]}
        onSelect={handleSelectService}
        placeholder="Chọn dịch vụ"
      />
      <input
        className="customer-name"
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Nhập tên khách hàng"
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
            <p className="modal-service">
              DV: {selectedService} <span style={{ marginLeft: "2px" }}>(Tại quầy số 1)</span>
            </p>
            <div className="modal-footer">
              <p>Thời gian cấp: {getCurrentFormattedTime()}</p>
              <p>Hạn sử dụng: {getExpiryTime(2)}</p> {/* Show expiry time 2 hours after */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewNumber;
