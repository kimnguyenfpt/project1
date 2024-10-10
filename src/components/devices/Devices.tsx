import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainDevices from "./MainDevices";
import Header from "../header/Header";

const Devices: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainDevices />
        </main>
      </div>
    </>
  );
};

export default Devices;
