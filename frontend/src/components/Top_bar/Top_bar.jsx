import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Top_bar.css";

const Top_bar = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/device_status");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err.message); // แสดงข้อผิดพลาด
        setError(err.message);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="header">
      <div className="box-1">
        <div className="box-2">
          <div className="box-3">
            <div className="box-4">Transformer</div>
            <a className="p-0" href="">
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ color: "green", strokeWidth: "3" }}
              />
              <span className="nav-text">{data.totalonline}</span>
            </a>
            <span className="nav-text">:</span>
            <a className="p-0" href="">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                style={{ color: "orange", strokeWidth: "3" }}
              />
              <span className="nav-text">{data.Device_Alarms}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="box-alert-1">
        <div className="box-alert-2">
          <div className="box-alert-3">
            <div className="box-alert-4">Alert</div>
            <a className="nav-link p-0" href="">
              <span className="nav-text">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  style={{ color: "red", strokeWidth: "3" }}
                />
                {data ? data.totaloffline : "Loading..."}
              </span>
            </a>
          </div>
        </div>
      </div>

      <hr className="divider-line" />

      <div className="box-account-1">
        <div className="box-account-2">
          <a href="">
            <span className="bxa-1">
              Welcome,<strong>admin</strong>
            </span>
            &nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faUser} className="dropdown-icon" />
          </a>
        </div>
      </div>

      <hr className="divider-line" />

      <div className="A">
        <div className="B">
          <div className="C">
            <h4 className="C-1">Usage</h4>
            <strong className="divider">|</strong>
            <span className="C-2">Today's current usage summary</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Top_bar;
