import React, { useState, useEffect }  from "react";

const Stocks = () => {

  
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
      fetch(`https://packaging-backend-ccd132e45603.herokuapp.com/stocks`)
        .then((res) => res.json())
        .then((data) => {
          setStocks(data);
        })
        .catch((err) => console.log(err));

  },);

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", padding: "20px" }}>
      {/* Header section with flex layout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Notifications</h2>
          <p style={{ color: "#555", margin: 0 }}>Gérer mes notifications</p>
        </div>
        
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div> {/* Légère et moins large */}

      <div style={{ height: "10px" }}></div>

      {/* Table container with white background and rounded borders */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        
      </div>
    </div>
  );
};


export default Stocks;
