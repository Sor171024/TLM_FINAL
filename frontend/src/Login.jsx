import React, { useState } from "react";
import axios from "axios";
import "./login.css";

function Login({ onLogin }) {
  // State สำหรับเก็บค่าชื่อผู้ใช้ รหัสผ่าน และข้อความผิดพลาด
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ฟังก์ชันสำหรับจัดการการล็อกอิน
  const handleLogin = async () => {
    // ตรวจสอบค่าว่างของ username และ password
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      // ส่ง request ไปยัง API เพื่อล็อกอิน
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      // ตรวจสอบ response จาก API
      if (
        response.status === 200 &&
        response.data.message === "Login successful"
      ) {
        onLogin(); // เรียกฟังก์ชัน onLogin เพื่อเปลี่ยนสถานะการล็อกอิน
      } else {
        setError(response.data.message || "Invalid username or password.");
      }
    } catch (err) {
      // จัดการ error จาก API
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <img src="./wellfine_01.png" alt="Logo" />
        <br />

        {/* ข้อความหลัก */}
        <div className="main-text">
          <br />
          <h3>Transformer Load Manager Software</h3>
          <p>Please login to access the management system.</p>
          <br />
        </div>

        {/* ฟอร์มล็อกอิน */}
        <div className="form-container">
          {/* ช่องกรอกชื่อผู้ใช้ */}
          <div className="input-field">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* ช่องกรอกรหัสผ่าน */}
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* แสดงข้อความผิดพลาด (ถ้ามี) */}
          {error && <p className="error-message">{error}</p>}

          {/* ตัวเลือก Remember password และ Forgot password */}
          <div className="checkbox-container">
            <label>
              <input type="checkbox" />
              Remember password
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          {/* ปุ่มล็อกอิน */}
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
