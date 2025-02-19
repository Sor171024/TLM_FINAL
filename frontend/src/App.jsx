import React, { useState, useEffect } from "react";
import Top_bar from "./components/Top_bar/Top_bar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./Login";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // โหลดสถานะการล็อกอินจาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = () => {
    // ฟังก์ชันสำหรับล็อกอิน
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // บันทึกสถานะการล็อกอิน
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // ลบสถานะล็อกอิน
    window.location.reload();
  };
  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="main-layout">
          <div className="side">
            <Sidebar onLogout={handleLogout} />
          </div>
          <div className="head">
            <Top_bar />
            <div className="dash">
              <Dashboard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
