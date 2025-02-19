import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TopTenUsage.css";
const TopTenUsage = () => {
  const [data, setData] = useState(""); // เปลี่ยนค่าเริ่มต้นเป็น null
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true); // เพิ่มสถานะการโหลด
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/top_ten_usage");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
      // finally {
      // setLoading(false); // ปิดสถานะการโหลด
      // }
    };
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);
  // if (loading) {
  //   return <div>Loading...</div>; // แสดงข้อความโหลด
  // }
  if (error) {
    return <div>Error: {error}</div>; // แสดงข้อความเมื่อมีข้อผิดพลาด
  }

  if (!data || !data.Name) {
    //|| !data.KWH || !data.KW
    return <div>No data available</div>; // ตรวจสอบว่า data มีข้อมูลครบหรือไม่
  }
  return (
    <section>
      <div className="top-ten-usage">
        <h3>Top Ten Energy Usage</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>MEA No.</th>
              <th>TLM ID</th>
              <th>Energy (kWh)</th>
              <th>Max. Power (kW)</th>
              <th>Location</th>
              <th>MEA Area</th>
              <th>Installation Date</th>
            </tr>
          </thead>
          <tbody>
            {data.Name.map((name, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.MEA_NO[index]}</td>
                <td>{name}</td>
                <td>{data.KWH[index]}</td>
                <td>{data.KW[index]}</td>
                <td>{data.Location[index]}</td>
                <td>{data.MEA_AREA[index]}</td>
                <td>{data.Instal_date[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bottom">
        {data.year ? data.year : new Date().getFullYear()} © Transformer Load
        Manager Software
      </div>
    </section>
  );
};

export default TopTenUsage;
