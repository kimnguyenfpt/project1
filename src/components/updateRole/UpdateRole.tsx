import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainUpdateRole from "./MainUpdateRole";
import Header from "../header/Header";

const UpdateRole: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainUpdateRole />
        </main>
      </div>
    </>
  );
};

export default UpdateRole;
