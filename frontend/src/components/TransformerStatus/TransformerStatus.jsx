// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Pie } from "react-chartjs-2";
// import "chart.js/auto"; // Automatically imports Chart.js dependencies
// import "./TransformerStatus.css";

// const TransformerStatus = () => {
//   const [data, setData] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/device_status");
//         setData(response.data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 15000);
//     return () => clearInterval(interval);
//   }, []);
//   const data_label = {
//     labels: ["online ", "offline "],
//     datasets: [
//       {
//         data: [data.onlinePercent, data.offlinePercent],
//         backgroundColor: ["rgba(50,205,50)", "rgba(246,78,96)"],
//         hoverBackgroundColor: ["rgba(50,205,50)", "rgba(246,78,96)"],
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         position: "right",
//         labels: {
//           usePointStyle: true,
//           boxWidth: 10,
//           boxHeight: 10,
//         },
//       },
//     },
//   };

//   return (
//     <div className="transformer-status">
//       <h3>Total Transformer</h3>
//       <div className="pie-chart">
//         <Pie data={data_label} options={options} />
//       </div>
//     </div>
//   );
// };

// export default TransformerStatus;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./TransformerStatus.css"; // CSS รวม

const TransformerStatus = () => {
  const [deviceData, setDeviceData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [timeframe, setTimeframe] = useState("1h");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deviceResponse, chartResponse] = await Promise.all([
          axios.get("/api/device_status"),
          axios.get(`/api/line_graph?timeframe=${timeframe}`),
        ]);
        setDeviceData(deviceResponse.data);
        setChartData(chartResponse.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [timeframe]); // รีโหลดเมื่อ timeframe เปลี่ยน

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  // Chart Data for Pie
  const pieData = {
    labels: ["Online", "Offline"],
    datasets: [
      {
        data: deviceData
          ? [deviceData.onlinePercent, deviceData.offlinePercent]
          : [0, 0],
        backgroundColor: ["rgba(50,205,50)", "rgba(246,78,96)"],
        hoverBackgroundColor: ["rgba(50,205,50)", "rgba(246,78,96)"],
      },
    ],
  };

  const pieOptions = {
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

  // Chart Data for Line
  const lineData = {
    labels: chartData?.ts || [],
    datasets: [
      {
        label: "kW",
        data: chartData?.kw || [],
        borderColor: "rgba(50,205,50)",
        backgroundColor: "rgba(50,205,50)",
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 6,
      },
      {
        label: "kVAR",
        data: chartData?.kvah || [],
        borderColor: "rgba(27,197,189)",
        backgroundColor: "rgba(27,197,189)",
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { usePointStyle: true },
      },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: { display: true },
        ticks: { maxRotation: 45, minRotation: 45 },
      },
      y: { title: { display: true }, beginAtZero: true },
    },
  };

  return (
    <div className="dashboard">
      <div className="power-chart">
        <div className="power-chart-main">
          <h3>Active vs Reactive Power</h3>
          <div className="timeframe-selector">
            <select
              id="timeframe"
              value={timeframe}
              onChange={handleTimeframeChange}
            >
              <option value="1M">1 minute</option>
              <option value="1h">1 hour</option>
              <option value="6h">6 hours</option>
              <option value="12h">12 hours</option>
              <option value="1d">1 day</option>
              <option value="1m">1 month</option>
            </select>
          </div>
          <div className="chart-container">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
      {/* Transformer Status (Pie Chart) */}
      <div className="transformer-status">
        <h3>Total Transformer</h3>
        <div className="pie-chart">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};
export default TransformerStatus;
