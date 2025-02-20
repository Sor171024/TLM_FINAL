import React from "react";
import Max_kw_kvar from "../Max_kw_kvar/Max_kw_kvar";
import TransformerStatus from "../TransformerStatus/TransformerStatus";
import TopTenUsage from "../TopTenUsage/TopTenUsage";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="max-kw-kvar">
        <Max_kw_kvar />
      </div>
      <div className="dashboard-charts">
        <TransformerStatus />
      </div>
      <div className="top-ten">
        <TopTenUsage />
      </div>
    </div>
  );
};

export default Dashboard;
