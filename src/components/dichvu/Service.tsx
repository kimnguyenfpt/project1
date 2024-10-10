import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainService from "./MainService";
import Header from "../header/Header";

const Service: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainService />
        </main>
      </div>
    </>
  );
};

export default Service;
