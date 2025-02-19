import React from "react";
import Max_kw_kvar from "../Max_kw_kvar/Max_kw_kvar";
import PowerChart from "../PowerChart/PowerChart";
import TransformerStatus from "../TransformerStatus/TransformerStatus";
import TopTenUsage from "../TopTenUsage/TopTenUsage";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Max_kw_kvar />
      <div className="dashboard-charts">
        <PowerChart />
        <TransformerStatus />
      </div>
      <TopTenUsage />
    </div>
  );
};

export default Dashboard;
