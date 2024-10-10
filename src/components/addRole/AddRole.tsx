import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainAddRole from "./MainAddRole";
import Header from "../header/Header";

const AddRole: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainAddRole />
        </main>
      </div>
    </>
  );
};

export default AddRole;
