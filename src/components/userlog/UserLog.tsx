import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainUserLog from "./MainUserLog";
import Header from "../header/Header";

const UserLog: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainUserLog />
        </main>
      </div>
    </>
  );
};

export default UserLog;
