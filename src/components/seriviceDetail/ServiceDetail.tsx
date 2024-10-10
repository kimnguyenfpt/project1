import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import ServiceManagement from "./ServiceManagement";

const ServiceDetail: React.FC = () => {
  return (
    <>
      <Header pageTitle="Quản lý thiết bị" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <ServiceManagement />
        </main>
      </div>
    </>
  );
};

export default ServiceDetail;
