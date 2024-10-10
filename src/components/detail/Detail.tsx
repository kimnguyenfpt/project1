import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import DeviceDetail from "./DeviceDetail";

const Detail: React.FC = () => {
  return (
    <>
      <Header pageTitle="Quản lý thiết bị" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <DeviceDetail />
        </main>
      </div>
    </>
  );
};

export default Detail;
