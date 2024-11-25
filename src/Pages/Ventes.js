import React from "react";
import { FaShoppingCart } from "react-icons/fa"; // Icône de vente
import { Link } from "react-router-dom";

const Ventes = () => {
  const salesData = [
    { name: "Packaging artisanal", date: "21/11/24", quantity: 3, total: "300 £" },
    { name: "Bag packaging", date: "21/11/24", quantity: 2, total: "500 £" },
    { name: "Rectangular packaging", date: "21/11/24", quantity: 7, total: "60 £" },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Header section with flex layout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ margin: 0 }}>Ventes</h2>
          <p style={{ color: "#555", margin: 0 }}>Gérer mes ventes</p>
        </div>
        <Link to="/vendre">
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
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          <FaShoppingCart style={{ marginRight: "10px" }} /> {/* Icône de vente avec un espacement à droite */}
          Vendre un produit
        </button>
        </Link>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div> {/* Légère et moins large */}

      <div style={{ height: "10px" }}></div>

      {/* Table container with white background and rounded borders */}
      <div style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...styles.headerCell, textAlign: "left" }}>Nom du produit</th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>Date de vente</th> {/* Centré */}
              <th style={{ ...styles.headerCell, textAlign: "center" }}>Quantité vendue</th> {/* Centré */}
              <th style={{ ...styles.headerCell, textAlign: "center" }}>Montant total</th> {/* Centré */}
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{sale.name}</td>
                <td style={{ ...styles.cell, textAlign: "center" }}>{sale.date}</td> {/* Centré */}
                <td style={{ ...styles.cell, textAlign: "center" }}>{sale.quantity}</td> {/* Centré */}
                <td style={{ ...styles.cell, textAlign: "center" }}>{sale.total}</td> {/* Centré */}
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

export default Ventes;
