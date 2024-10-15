import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/RightPanel.css";
import Header from "../header/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const RightPanel: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [deviceStats, setDeviceStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [serviceStats, setServiceStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [numberStats, setNumberStats] = useState({
    total: 0,
    used: 0,
    waiting: 0,
    skipped: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDeviceStats = async () => {
    const querySnapshot = await getDocs(collection(db, "devices"));
    let activeDevices = 0;
    let inactiveDevices = 0;

    console.log(`Total devices fetched: ${querySnapshot.size}`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const rawStatus = data.status || "(no status)";

      // Sử dụng localeCompare để so sánh trạng thái, với ngôn ngữ 'vi' cho tiếng Việt
      if (
        rawStatus.localeCompare("hoạt động", "vi", { sensitivity: "base" }) ===
        0
      ) {
        activeDevices += 1;
      } else if (
        rawStatus.localeCompare("ngưng hoạt động", "vi", {
          sensitivity: "base",
        }) === 0
      ) {
        inactiveDevices += 1;
      } else {
        console.warn(
          `Unknown status found in Document ID: ${doc.id}`,
          rawStatus
        );
      }
    });

    setDeviceStats({
      total: querySnapshot.size,
      active: activeDevices,
      inactive: inactiveDevices,
    });
  };

  const fetchServiceStats = async () => {
    const querySnapshot = await getDocs(collection(db, "services"));
    let activeServices = 0;
    let inactiveServices = 0;

    console.log(`Total services fetched: ${querySnapshot.size}`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const rawStatus = data.status || "(no status)";

      // Use localeCompare for comparing status with Vietnamese locale ('vi')
      if (
        rawStatus.localeCompare("Hoạt động", "vi", { sensitivity: "base" }) ===
        0
      ) {
        activeServices += 1;
      } else if (
        rawStatus.localeCompare("Ngưng hoạt động", "vi", {
          sensitivity: "base",
        }) === 0
      ) {
        inactiveServices += 1;
      } else {
        console.warn(
          `Unknown status found in Document ID: ${doc.id}`,
          rawStatus
        );
      }
    });

    setServiceStats({
      total: querySnapshot.size,
      active: activeServices,
      inactive: inactiveServices,
    });

    console.log(
      `Active services: ${activeServices}, Inactive services: ${inactiveServices}`
    );
  };

  const fetchNumberStats = async () => {
    const querySnapshot = await getDocs(collection(db, "numbers"));
    let usedNumbers = 0;
    let waitingNumbers = 0;
    let skippedNumbers = 0;

    console.log(`Total numbers fetched: ${querySnapshot.size}`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const rawStatus = data.status || "(no status)";

      // Use localeCompare for status comparison, with 'vi' locale for Vietnamese
      if (
        rawStatus.localeCompare("Đã sử dụng", "vi", { sensitivity: "base" }) ===
        0
      ) {
        usedNumbers += 1;
      } else if (
        rawStatus.localeCompare("Đang chờ", "vi", { sensitivity: "base" }) === 0
      ) {
        waitingNumbers += 1;
      } else if (
        rawStatus.localeCompare("Bỏ qua", "vi", { sensitivity: "base" }) === 0
      ) {
        skippedNumbers += 1;
      } else {
        console.warn(
          `Unknown status found in Document ID: ${doc.id}`,
          rawStatus
        );
      }
    });

    setNumberStats({
      total: querySnapshot.size,
      used: usedNumbers,
      waiting: waitingNumbers,
      skipped: skippedNumbers,
    });

    console.log(
      `Used numbers: ${usedNumbers}, Waiting numbers: ${waitingNumbers}, Skipped numbers: ${skippedNumbers}`
    );
  };

  // Fetch all stats when the component mounts
  useEffect(() => {
    const fetchAllStats = async () => {
      setLoading(true);
      await Promise.all([
        fetchDeviceStats(),
        fetchServiceStats(),
        fetchNumberStats(),
      ]);
      setLoading(false);
    };

    fetchAllStats();
  }, []);

  const onChange = (newDate: Date | [Date | null, Date | null] | null) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    } else if (Array.isArray(newDate) && newDate[0] instanceof Date) {
      setDate(newDate[0]);
    } else {
      setDate(null);
    }
  };

  return (
    <div className="right-panel">
      <Header pageTitle="" />
      <div className="overview-section">
        <h2 className="overview-title">Tổng quan</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Card 1 - Thiết bị */}
            <div className="card">
              <div className="card-content">
                <img src="./img/box1.png" alt="" />
                <div className="device-stats">
                  <span className="number">{deviceStats.total}</span>
                  <span className="label-icon">
                    <img
                      src="./img/box1a.png"
                      alt="icon"
                      className="icon-image"
                    />{" "}
                    Thiết bị
                  </span>
                </div>
                <div className="device-info">
                  <div className="info-item">
                    <span className="active-devices">Đang hoạt động</span>
                    <span className="active-number orange-text">
                      {deviceStats.active}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="inactive-devices">Ngừng hoạt động</span>
                    <span className="active-number orange-text">
                      {deviceStats.inactive}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Dịch vụ */}
            <div className="card">
              <div className="card-content">
                <img src="./img/box2.png" alt="" />
                <div className="device-stats">
                  <span className="number">{serviceStats.total}</span>
                  <span className="label-icon blue">
                    <img
                      src="./img/blue.png"
                      alt="icon"
                      className="icon-image"
                    />{" "}
                    Dịch vụ
                  </span>
                </div>
                <div className="device-info">
                  <div className="info-item">
                    <span className="active-devices">Đang hoạt động</span>
                    <span className="blue-text">{serviceStats.active}</span>
                  </div>
                  <div className="info-item">
                    <span className="inactive-devices">Ngừng hoạt động</span>
                    <span className="blue-text">{serviceStats.inactive}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Cấp số */}
            <div className="card">
              <div className="card-content">
                <img src="./img/box3.png" alt="" />
                <div className="device-stats">
                  <span className="number">{numberStats.total}</span>
                  <span className="label-icon green">
                    <img
                      src="./img/green.png"
                      alt="icon"
                      className="icon-image"
                    />{" "}
                    Cấp số
                  </span>
                </div>
                <div className="device-info">
                  <div className="info-item">
                    <span className="green-active-devices">Đã sử dụng</span>
                    <span className="green-text">{numberStats.used}</span>
                  </div>
                  <div className="info-item">
                    <span className="green-active-devices">Đang chờ</span>
                    <span className="green-text">{numberStats.waiting}</span>
                  </div>
                  <div className="info-item">
                    <span className="green-active-devices">Bỏ qua</span>
                    <span className="green-text">{numberStats.skipped}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="calendar-section">
          <Calendar
            onChange={onChange}
            value={date} // The selected date
            locale="en-EN"
            className="custom-calendar"
            prevLabel="‹"
            nextLabel="›"
            prev2Label={null}
            next2Label={null}
            navigationLabel={({ date }) => {
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "short" });
              const year = date.getFullYear();
              return `${day} ${month} ${year}`;
            }}
            activeStartDate={date || new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
