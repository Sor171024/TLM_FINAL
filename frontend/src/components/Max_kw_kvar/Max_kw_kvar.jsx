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
      <section className="conclude-kw">
        <article className="conclude-kw-a">
          <h3>Today's Max kW</h3>
        </article>
        <div className="conclude-kw-b">
          <h1>{data.kw_max_day}</h1>
        </div>
        <h3 className="conclude-kw-c">kW</h3>
      </section>

      <section className="conclude-kVAR">
        <article className="conclude-kVAR-a">
          <h3>Today's Max kVAR</h3>
        </article>
        <div className="conclude-kVAR-b">
          <h1>{data.kvar_max_day}</h1>
        </div>
        <h3 className="conclude-kVAR-c">kVAR</h3>
      </section>

      <div className="conclude-lt-kw">
        <section className="conclude-lt-kw-a">
          <h3>Real-time kW</h3>
        </section>
        <article className="conclude-lt-kw-b">
          <h1>{data.kw_max}</h1>
        </article>
        <h3 className="conclude-lt-kw-c">kW</h3>
      </div>

      <div className="conclude-lt-kVAR">
        <section className="conclude-lt-kVAR-a">
          <h3>Real-time kVAR</h3>
        </section>
        <article className="conclude-lt-kVAR-b">
          <h1>{data.kvar_max}</h1>
        </article>
        <h3 className="conclude-lt-kVAR-c">kVAR</h3>
      </div>
    </div>
  );
};

export default Max_kw_kvar;
