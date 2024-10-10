import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/FirebaseConfig'; 
import "./Numbers.css";
interface DetailNumberProps {
    customerName: string;
    service: string;
    id: string;
    issueTime: string;
    expiryTime: string;
    source: string;
    status: string;
    phone: string;
    email: string;
}

const Numbers: React.FC = () => {
    const { numberId } = useParams<{ numberId: string }>(); 
    const navigate = useNavigate();
    const [numberDetail, setNumberDetail] = useState<DetailNumberProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'numbers', numberId!); // Lấy tài liệu theo numberId
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as DetailNumberProps;
                    setNumberDetail({
                        ...data,
                        id: docSnap.id, // Đảm bảo id lấy từ document ID của Firestore
                    });
                } else {
                    setError('Không tìm thấy số này.');
                }
            } catch (err) {
                setError('Có lỗi xảy ra khi lấy dữ liệu.'); 
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [numberId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!numberDetail) return <p>Dữ liệu không tồn tại.</p>;

    return (
<>
  <h2>Quản lý cấp số</h2>
  <div className="number-detail-grid">
    <h3>Thông tin cấp số</h3>
    <p>
      <strong>Họ tên:</strong> <span>{numberDetail?.customerName}</span>
    </p>
    <p>
      <strong>Nguồn cấp:</strong> <span>{numberDetail?.source}</span>
    </p>
    <p>
      <strong>Tên dịch vụ:</strong> <span>{numberDetail?.service}</span>
    </p>
    <p>
  <strong>Trạng thái:</strong>
  <span
    className={`status-dot ${
      numberDetail?.status.trim().localeCompare("Đang chờ") === 0
        ? "status-waiting"
        : numberDetail?.status.trim().localeCompare("Đã sử dụng") === 0
        ? "status-used"
        : numberDetail?.status.trim().localeCompare("Bỏ qua") === 0
        ? "status-cancelled"
        : ""
    }`}
  ></span>
  {numberDetail?.status}
</p>
    <p>
      <strong>Số thứ tự:</strong> <span>{numberDetail?.id}</span>
    </p>
    <p>
      <strong>Số điện thoại:</strong> <span>{numberDetail?.phone}</span>
    </p>
    <p>
      <strong>Thời gian cấp:</strong> <span>{numberDetail?.issueTime}</span>
    </p>
    <p>
      <strong>Email:</strong> <span>{numberDetail?.email}</span>
    </p>
    <p>
      <strong>Hạn sử dụng:</strong> <span>{numberDetail?.expiryTime}</span>
    </p>
  </div>
  <button 
    className="back-submit-button" 
    onClick={() => navigate(`/number`)}
  >
    <img src="/img/back.png" alt="edit icon" />
    Quay lại
  </button>
</>

    );
};

export default Numbers;
