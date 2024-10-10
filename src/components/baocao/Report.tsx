import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainReport from "./MainReport"
import Header from "../header/Header";

const Report: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainReport />
        </main>
      </div>
    </>
  );
};

export default Report;
