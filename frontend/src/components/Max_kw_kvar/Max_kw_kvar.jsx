import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Max_kw_kvar.css";

const Max_kw_kvar = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  return (
    <div className="usage-conclude">
      <div className="conclude-kw">
        <div className="conclude-kw-a">
          <h3>Today's Max kW</h3>
        </div>
        <div className="conclude-kw-b">
          <h1>{data.kw_max_day}</h1>
        </div>
        <div className="conclude-kw-c">kW</div>
      </div>

      <div className="conclude-kVAR">
        <div className="conclude-kVAR-a">
          <h3>Today's Max kVAR</h3>
        </div>
        <div className="conclude-kVAR-b">
          <h1>{data.kvar_max_day}</h1>
        </div>
        <div className="conclude-kVAR-c">kVAR</div>
      </div>

      <div className="conclude-lt-kw">
        <div className="conclude-lt-kw-a">
          <h3>Real-time kW</h3>
        </div>
        <div className="conclude-lt-kw-b">
          <h1>{data.kw_max}</h1>
        </div>
        <div className="conclude-lt-kw-c">kW</div>
      </div>

      <div className="conclude-lt-kVAR">
        <div className="conclude-lt-kVAR-a">
          <h3>Real-time kVAR</h3>
        </div>
        <div className="conclude-lt-kVAR-b">
          <h1>{data.kvar_max}</h1>
        </div>
        <div className="conclude-lt-kVAR-c">kVAR</div>
      </div>
    </div>
  );
};

export default Max_kw_kvar;
