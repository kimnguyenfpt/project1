import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import NewNumber from "./NewNumber";

const AddNumber: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <NewNumber />
        </main>
      </div>
    </>
  );
};

export default AddNumber;
