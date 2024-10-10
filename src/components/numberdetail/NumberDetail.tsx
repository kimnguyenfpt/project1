import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Numbers from "./Numbers";

const NumberDetail: React.FC = () => {
  return (
    <>
      <Header pageTitle="Quản lý thiết bị" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <Numbers />
        </main>
      </div>
    </>
  );
};

export default NumberDetail;
