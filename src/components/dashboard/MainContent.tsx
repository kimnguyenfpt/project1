import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import type { ScriptableContext } from 'chart.js';
import "chart.js/auto";
import "./MainContent.css";

const MainContent = () => {
  const [viewType, setViewType] = useState("Ngày"); // Default view type
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle dropdown visibility

  // Handle switching view type between Ngày, Tuần, Tháng
  const handleViewChange = (selectedViewType: string) => {
    setViewType(selectedViewType); // Update the selected view
    setIsDropdownOpen(false); // Close the dropdown menu
  };

  // Toggle dropdown open/close
  const toggleDropdownMenu = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  const stats = [
    {
      value: "4.221",
      change: "32.41%",
      changeType: "positive", 
      icon: "./img/icon1.png",
      svg: (
        <svg className="icon-1" width="12px" height="12px" fill="#FF9138" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 
            12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 
            246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      ),
    },
    {
      value: "3.721",
      change: "32.41%",
      changeType: "negative",
      icon: "./img/icon2.png",
      svg: (
        <svg className="icon-2" width="12px" height="12px" fill="#E73F3F" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 
            12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 
            14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      ),
    },
    {
      value: "468",
      change: "56.41%",
      changeType: "positive",
      icon: "./img/icon3.png",
      svg: (
        <svg className="icon-3" width="14px" height="14px" fill="#FF9138" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 
            12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 
            246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      ),
    },
    {
      value: "32",
      change: "22.41%",
      changeType: "negative",
      icon: "./img/icon4.png",
      svg: (
        <svg className="icon-4" width="10px" height="10px" fill="#E73F3F" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 
            12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 
            14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      ),
    }
  ];

  const getLineChartData = () => {
    if (viewType === "Ngày") {
      return {
        labels: ["01", "05", "10", "13", "19", "23", "31"], // Day labels
        datasets: [
          {
            label: "Số thứ tự đã cấp",
            data: [1000, 2000, 3000, 2500, 4221, 3500, 3200], // Data for daily view
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.3)",
            fill: true,
            tension: 0.5,
            pointRadius: function (context: ScriptableContext<'line'>) {
              const index = context.dataIndex;
              const labels = context.chart.data.labels;
              const label = labels ? labels[index] : null;
              return label === "19" ? 5 : 0; // Show circle only on "19"
            },
            pointHoverRadius: function (context: ScriptableContext<'line'>) {
              const index = context.dataIndex;
              const labels = context.chart.data.labels;
              const label = labels ? labels[index] : null;
              return label === "19" ? 7 : 0; // Larger circle on hover for "19"
            },
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#3b82f6",
            pointBorderWidth: 3,
          },
        ],
      };
    } else if (viewType === "Tuần") {
      return {
        labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"], // Week labels
        datasets: [
          {
            label: "Số thứ tự đã cấp",
            data: [3000, 3500, 4221, 2800], // Data for weekly view
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.3)",
            fill: true,
            tension: 0.5,
            pointRadius: function (context: ScriptableContext<'line'>) {
              const index = context.dataIndex;
              const labels = context.chart.data.labels;
              const label = labels ? labels[index] : null;
              return label === "Tuần 3" ? 5 : 0; // Show circle only on "Tuần 3"
            },
            pointHoverRadius: function (context: ScriptableContext<'line'>) {
              const index = context.dataIndex;
              const labels = context.chart.data.labels;
              const label = labels ? labels[index] : null;
              return label === "Tuần 3" ? 7 : 0; // Larger circle on hover for "Tuần 3"
            },
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#3b82f6",
            pointBorderWidth: 3,
          },
        ],
      };
    } else if (viewType === "Tháng") {
      return {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], // Month labels
        datasets: [
          {
            label: "Số thứ tự đã cấp",
            data: [2800, 3680, 4200, 3900, 3150, 3600, 3534, 4000, 3867, 3530, 4221, 3720], // Data for monthly view
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.3)",
            fill: true,
            tension: 0.5,
            pointRadius: function (context: ScriptableContext<'line'>) {
              const index = context.dataIndex;
              const labels = context.chart.data.labels;
              const label = labels ? labels[index] : null;
              return label === "11" ? 5 : 0; // Show circle only on "Tháng 11"
            },
            pointHoverRadius: function (context: ScriptableContext<'line'>) {
              const index = context.dataIndex;
              const labels = context.chart.data.labels;
              const label = labels ? labels[index] : null;
              return label === "11" ? 7 : 0; // Larger circle on hover for "Tháng 11"
            },
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#3b82f6",
            pointBorderWidth: 3,
          },
        ],
      };
    }
    
    // Default return to ensure chart data is never undefined
    return {
      labels: [],
      datasets: [
        {
          label: "No data",
          data: [],
          borderColor: "#888888",
          backgroundColor: "rgba(136, 136, 136, 0.3)",
          fill: true,
          tension: 0.5,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#888888",
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 4,
        },
      ],
    };
  };  
  const lineChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 20,
        right: 0,
        top: 10,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#3b82f6",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ffffff",
        displayColors: false,
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.raw;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: `sl / ${viewType.toLowerCase()}`,
          color: "#888888",
          font: {
            size: 12,
          },
          align: "start" as const,
          position: "start",
          offset: true,
          padding: {
            top: 0,
          },
        },
        ticks: {
          color: "#888888",
          padding: 15,
          callback: function (value: string | number, index: number) {
            // Show different labels depending on the viewType
            if (viewType === "Ngày") {
              const labelsToShow = ["01", "13", "19", "31"]; // Only show these labels in daily view
              const label = getLineChartData().labels[index];
              return labelsToShow.includes(label) ? label : "";
            } else {
              // For "Tuần" and "Tháng", show all labels
              const label = getLineChartData().labels[index];
              return label;
            }
          },
        },
      },
      y: {
        grid: {
          drawBorder: false,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          display: true,
          color: "#888888",
          stepSize: 1000,
        },
        min: 0,
        max: 6000,
      },
    },
  };
  
  

  return (
    <div className="dashboard">
      <h2>Biểu đồ cấp số</h2>

      {/* Thẻ thống kê */}
      <div className="stats-cards">
        {stats.map((stat, index) => (
          <div key={index} className="stats-box">
            <img src={stat.icon} alt="Icon" />
            <div className="card-content">
              <span className="value">{stat.value}</span>
              <div className={`change ${stat.changeType}`}>
                {stat.svg}
                <span className="text-1">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Biểu đồ */}
      <div className="chart-container">
        <div className="chart-header">
          <div>
            <h3>Bảng thống kê theo {viewType.toLowerCase()}</h3> {/* Dynamically update heading */}
            <div className="date">Tháng 11/2021</div>
          </div>
          <div className="filter">
            <span>Xem theo</span>
            <div className="custom-select" onClick={toggleDropdownMenu}>
              <p id="selected-option">{viewType}</p>
              <svg
                className="select-icon"
                width="16"
                height="16"
                fill="#FF7506"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 
                    11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 
                    192c-12.9 0-24.6 7.8-29.6 
                    19.8s-2.2 25.7 6.9 34.9l128 128z"
                />
              </svg>
              {isDropdownOpen && (
                <ul id="dash-dropdown-menu" className="dash-dropdown-menu">
                  <li onClick={() => handleViewChange("Ngày")}>Ngày</li>
                  <li onClick={() => handleViewChange("Tuần")}>Tuần</li>
                  <li onClick={() => handleViewChange("Tháng")}>Tháng</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="chart-box">
          <Line data={getLineChartData()} options={lineChartOptions} /> {/* Use dynamic chart data */}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
