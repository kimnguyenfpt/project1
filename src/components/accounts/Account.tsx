import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainAccount from "./MainAccount";
import Header from "../header/Header";

const Account: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainAccount />
        </main>
      </div>
    </>
  );
};

export default Account;
