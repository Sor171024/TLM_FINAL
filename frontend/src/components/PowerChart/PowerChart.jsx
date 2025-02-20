// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import axios from "axios";
// import "chart.js/auto";
// import "./PowerChart.css";

// const PowerChart = () => {
//   const [data, setData] = useState("");
//   const [error, setError] = useState("");
//   const [timeframe, setTimeframe] = useState("1h");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `/api/line_graph?timeframe=${timeframe}`
//         );
//         setData(response.data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchData();
//     const interval = setInterval(fetchData, 300000);
//     return () => clearInterval(interval);
//   }, [timeframe]); // Re-fetch เมื่อ timeframe เปลี่ยน

//   const handleTimeframeChange = (event) => {
//     setTimeframe(event.target.value);
//   };

//   const data_label = {
//     labels: data.ts,
//     datasets: [
//       {
//         label: "kW",
//         data: data.kw,
//         borderColor: "rgba(50,205,50)",
//         backgroundColor: "rgba(50,205,50)",
//         tension: 0.4,
//         pointRadius: 1,
//         pointHoverRadius: 6,
//       },
//       {
//         label: "kVAR",
//         data: data.kvah,
//         borderColor: "rgba(27,197,189)",
//         backgroundColor: "rgba(27,197,189)",
//         tension: 0.4,
//         pointRadius: 1,
//         pointHoverRadius: 6,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom",
//         labels: { usePointStyle: true },
//       },
//       tooltip: { mode: "index", intersect: false },
//     },
//     scales: {
//       x: {
//         title: { display: true },
//         ticks: { maxRotation: 45, minRotation: 45 },
//       },
//       y: { title: { display: true }, beginAtZero: true },
//     },
//   };

//   return (
//     <div className="power-chart">
//       <section className="power-chart-main">
//         <h3>Active vs Reactive Power</h3>
//         {error && <p style={{ color: "red" }}>Error: {error}</p>}
//         <div className="timeframe-selector">
//           <select
//             id="timeframe"
//             value={timeframe}
//             onChange={handleTimeframeChange}
//           >
//             <option value="1M">1 minute</option>
//             <option value="1h">1 hour</option>
//             <option value="6h">6 hour</option>
//             <option value="12h">12 hour</option>
//             <option value="1d">1 day</option>
//             <option value="1m">1 month</option>
//           </select>
//         </div>

//         <div className="chart-container">
//           <Line data={data_label} options={options} />
//         </div>
//       </section>
//     </div>
//   );
// };
// export default PowerChart;
