import React, { useState, useEffect }  from "react";
import { FaPlus } from "react-icons/fa"; // Icône de "Plus"
import { Link } from "react-router-dom";

const Produits = () => {

  const [produits, setProduits] = useState([]);

  useEffect(() => {
      fetch(`https://localhost:8000/produits`)
        .then((res) => res.json())
        .then((data) => {
          setProduits(data);
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
          <h2 style={{ margin: 0 }}>Produits</h2>
          <p style={{ color: "#555", margin: 0 }}>Créer mes produits</p>
        </div>
        <Link to="/init">
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
          Créer un produit
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
                Référence du produit
              </th>
              <th style={{ ...styles.headerCell, textAlign: "left" }}>
                Nom du produit
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Date de création
              </th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{produit.Reference_produit}</td>
                <td style={styles.cell}>{produit.Type_produit}</td>
                <td style={{ ...styles.cell, textAlign: "center" }}>
                  {produit.Date_entre}
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

export default Produits;
