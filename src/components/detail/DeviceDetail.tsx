import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import "./Detail.css";

// Định nghĩa kiểu dữ liệu cho thiết bị
interface Device {
  id: string;
  name: string;
  ip: string;
  type: string;
  username: string;
  password: string;
  service: string;
}

const DeviceDetail: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceDetail = async () => {
      if (!deviceId) {
        setError("Thiết bị không tồn tại");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "devices", deviceId); // Đảm bảo deviceId không undefined
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDevice({ id: docSnap.id, ...docSnap.data() } as Device);
        } else {
          setError("Thiết bị không tồn tại");
        }
      } catch (error) {
        setError("Có lỗi xảy ra khi tải thông tin thiết bị");
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceDetail();
  }, [deviceId]);

const navigate = useNavigate();

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Quản lý thiết bị</h2>
      <div className="device-detail-grid">
        <h3>Thông tin thiết bị</h3>
        <p>
          <strong>Mã thiết bị:</strong> {device?.id}
        </p>
        <p>
          <strong>Loại thiết bị:</strong> {device?.type}
        </p>
        <p>
          <strong>Tên thiết bị:</strong> {device?.name}
        </p>
        <p>
          <strong>Tên đăng nhập:</strong> {device?.username}
        </p>
        <p>
          <strong>Địa chỉ IP:</strong> {device?.ip}
        </p>
        <p>
          <strong>Mật khẩu:</strong> {device?.password}
        </p>
        <p className="">
          <strong>Dịch vụ sử dụng:</strong> {device?.service}
        </p>
      </div>
      <button 
        className="edit-submit-button" 
        onClick={() => navigate(`/devices/update/${device?.id}`)} // Sử dụng navigate
      >
        <img src="/img/Edit.png" alt="edit icon" />
        Cập nhật thiết bị
      </button>
    </>
  );
};

export default DeviceDetail;
