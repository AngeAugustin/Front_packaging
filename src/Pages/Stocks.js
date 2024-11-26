import React from "react";
import { FaPlus } from "react-icons/fa"; // Icône de "Plus"
import { Link } from "react-router-dom";

const Stocks = () => {
  const productsData = [
    { name: "Packaging artisanal ", quantity: 3 },
    { name: "Bag packaging  ", quantity: 2 },
    { name: "Rectangular packaging  ", quantity: 7 },
  ];

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
          <h2 style={{ margin: 0 }}>Stocks</h2>
          <p style={{ color: "#555", margin: 0 }}>Gérer mes stocks</p>
        </div>
        <Link to="/stocker">
        <button
          style={{
            backgroundColor: "#882904",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex", // Utilisation de flexbox pour aligner l'icône et le texte
            alignItems: "center", // Centrer verticalement l'icône et le texte
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FaPlus style={{ marginRight: "10px" }} /> 
          Compléter le stock
        </button>
      </Link>
        
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
                Nom du produit
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Quantité restante
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((sale, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{sale.name}</td>
                <td style={{ ...styles.cell, textAlign: "center" }}>
                  {sale.quantity}
                </td>
                <td
                  style={{
                    ...styles.cell,
                    textAlign: "center",
                    display: "flex", // Flexbox pour aligner le bouton
                    justifyContent: "center", // Centrer horizontalement
                    alignItems: "center", // Centrer verticalement
                  }}
                >
                  <Link to="/stocker">
                  <button
                    style={{
                      backgroundColor: "#882904", // Couleur marron
                      color: "white",
                      border: "none",
                      width: "25px", // Réduction de la largeur du cercle
                      height: "25px", // Réduction de la hauteur du cercle
                      borderRadius: "50%", // Cercle parfait
                      cursor: "pointer",
                      display: "flex", // Utilisation de flexbox pour l'alignement de l'icône
                      justifyContent: "center", // Centrer horizontalement l'icône
                      alignItems: "center", // Centrer verticalement l'icône
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <FaPlus style={{ fontSize: "15px" }} /> {/* Icône de "Plus" plus petite */}
                  </button>
                  </Link>
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

export default Stocks;
