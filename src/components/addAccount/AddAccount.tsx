import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import MainAddAccount from "./MainAddAccount";

const AddAccount: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
        <MainAddAccount />
        </main>
      </div>
    </>
  );
};

export default AddAccount;
