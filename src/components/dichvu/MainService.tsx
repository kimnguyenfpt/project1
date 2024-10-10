import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import "./MainService.css";
import FilterComponent from "./FilterComponent";

// Định nghĩa kiểu dữ liệu Service
interface Service {
  id: string;
  name: string;
  description: string;
  status: string;
}

const MainService: React.FC = () => {
  const [serviceStatus, setServiceStatus] = useState<string>("Tất cả");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch data from Firebase
  useEffect(() => {
    const fetchServices = async (status: string) => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const servicesData: Service[] = [];
        querySnapshot.forEach((doc) => {
          const serviceData = doc.data();
          servicesData.push({ id: doc.id, ...serviceData } as Service);
        });
        setServices(servicesData);
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy dữ liệu từ Firebase");
      } finally {
        setLoading(false);
      }
    };

    fetchServices(serviceStatus);
  }, [serviceStatus]);

  const filteredServices = services.filter(
    (service) =>
      (serviceStatus === "Tất cả" || service.status === serviceStatus) &&
      ((typeof service.name === "string" &&
        service.name.includes(searchTerm)) ||
        (typeof service.id === "string" && service.id.includes(searchTerm)))
  );

  // Return loading or error state if applicable
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const handleAddService = () => {
    navigate("/add-service");
  };

  return (
    <div className="services-container">
      <h2 className="services-title">Quản Lý Dịch Vụ</h2>

      <div className="services-buttons-section" onClick={handleAddService}>
        <button className="services-add">
          <img src="/img/btn-add.png" alt="" className="services-add-icon" />
          Thêm tài khoản
        </button>
      </div>

      <FilterComponent />

      <table className="service-table">
        <colgroup>
          <col style={{ width: "100px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "300px" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "80px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Mã dịch vụ</th>
            <th>Tên dịch vụ</th>
            <th>Mô tả</th>
            <th>Trạng thái hoạt động</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>
                <span
                  className={
                    typeof service.status === "string" &&
                    service.status.trim().localeCompare("Hoạt động") === 0
                      ? "status actives"
                      : "status inactive"
                  }
                >
                  {service.status}
                </span>
              </td>

              <td>
                <Link to={`/services/${service.id}`}>Chi tiết</Link>
              </td>
              <td>
                <Link to="/edit-service">Cập nhật</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="number-pagination">
        <span className="number-pagination-arrow">
          <img
            src="/img/arrow.png"
            alt="Previous"
            className="number-arrow-icon"
          />
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
    </div>
  );
};

export default MainService;
