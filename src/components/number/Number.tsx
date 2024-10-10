import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainNumber from "./MainNumber";
import Header from "../header/Header";

const Number: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <MainNumber />
        </main>
      </div>
    </>
  );
};

export default Number;
