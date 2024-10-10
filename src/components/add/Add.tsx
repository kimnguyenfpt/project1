import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import AddDevices from "./AddDevices";

const Add: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <AddDevices />
        </main>
      </div>
    </>
  );
};

export default Add;
