import React from "react";

const Clients = () => {
  const clientsData = [
    { name: "FACHEHOUN Ange", telephone: "54362288", mail: "angeaugustin@gmail.com", point: 45},
    { name: "KOLA Wolé", telephone: "90876655", mail: "kolawole@gmail.com", point: 200},
    { name: "ZIRA Mora", telephone: "47098877", mail: "morazika@gmail.com", point: 350},
    { name: "DIDI Ken", telephone: "97659001", mail: "kendidi@gmail.com", point: 700},
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
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
          <h2 style={{ margin: 0 }}>Clients</h2>
          <p style={{ color: "#555", margin: 0 }}>Gérer mes clients</p>
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
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...styles.headerCell, textAlign: "left" }}>
                Nom et Prénoms
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Téléphone
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Adresse email
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Point de fidélité
              </th>
            </tr>
          </thead>
          <tbody>
            {clientsData.map((sale, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{sale.name}</td>
                <td style={{ ...styles.cell, textAlign: "center" }}>
                  {sale.telephone}
                </td>
                <td style={{ ...styles.cell, textAlign: "center" }}>
                  {sale.mail}
                </td>
                <td style={{ ...styles.cell, textAlign: "center" }}>
                  {sale.point}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  headerCell: {
    borderBottom: "1px solid #ddd", // Bords légers pour les cellules d'en-tête
    padding: "10px",
    backgroundColor: "#f9f9f9",
  },
  cell: {
    padding: "10px",
    borderBottom: "1px solid #ddd", // Légère bordure sous les cellules
  },
  row: {
    backgroundColor: "#fff",
  },
};

export default Clients;
