import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainUpdateAccount from "./MainUpdateAccount";
import Header from "../header/Header";

const UpdateAccount: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainUpdateAccount />
        </main>
      </div>
    </>
  );
};

export default UpdateAccount;
