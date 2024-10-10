import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import EditDevices from "./EditDevices";

const Edit: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <EditDevices />
        </main>
      </div>
    </>
  );
};

export default Edit;
