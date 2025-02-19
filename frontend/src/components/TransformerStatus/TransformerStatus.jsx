import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Automatically imports Chart.js dependencies
import "./TransformerStatus.css";

const TransformerStatus = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/device_status");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);
  const data_label = {
    labels: ["online ", "offline "],
    datasets: [
      {
        data: [data.onlinePercent, data.offlinePercent],
        backgroundColor: ["rgba(50,205,50)", "rgba(246,78,96)"],
        hoverBackgroundColor: ["rgba(50,205,50)", "rgba(246,78,96)"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          boxHeight: 10,
        },
      },
    },
  };

  return (
    <div className="transformer-status">
      <h3>Total Transformer</h3>
      <div className="pie-chart">
        <Pie data={data_label} options={options} />
      </div>
    </div>
  );
};

export default TransformerStatus;
