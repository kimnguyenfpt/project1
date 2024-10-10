import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainRole from "./MainRole";
import Header from "../header/Header";

const Role: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainRole />
        </main>
      </div>
    </>
  );
};

export default Role;
