import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import ServiceForm from "./ServiceForm";

const AddService: React.FC = () => {
  return (
    <>
      <Header pageTitle="" />
      <div className="container">
        <Sidebar />
        {/* Main Content */}
        <main className="content">
          <ServiceForm />
        </main>
      </div>
    </>
  );
};

export default AddService;
