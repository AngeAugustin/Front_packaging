import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa"; // Icônes
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';// Importation du hook d'authentification

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");
  const { Username: currentUsername } = useAuth(); // Récupération du nom d'utilisateur connecté

  // Récupérer les produits depuis l'API
  useEffect(() => {
    fetch(`https://packaging-backend-ccd132e45603.herokuapp.com/produits`)
      .then((res) => res.json())
      .then((data) => {
        setProduits(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fonction pour ouvrir le menu de suppression
  const openDeleteModal = (produit) => {
    setSelectedProduct(produit);
    setShowDeleteModal(true);
  };

  // Fonction pour fermer le menu de suppression
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
    setUsernameInput("");
  };

  // Fonction pour supprimer un produit
  const handleDelete = () => {
    if (usernameInput === currentUsername && selectedProduct) {
      const url = `https://packaging-backend-ccd132e45603.herokuapp.com/delete?Reference_produit=${selectedProduct.Reference_produit}`;
      fetch(url, { method: "GET" })
        .then((res) => {
          if (res.ok) {
            setProduits(
              produits.filter(
                (produit) => produit.Reference_produit !== selectedProduct.Reference_produit
              )
            );
            closeDeleteModal();
          } else {
            console.error("Erreur lors de la suppression du produit");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Le nom d'utilisateur saisi est incorrect.");
    }
  };

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", padding: "20px" }}>
      {/* Header */}
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
              backgroundColor: "#004aad",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <FaPlus style={{ marginRight: "10px" }} />
            Créer un produit
          </button>
        </Link>
      </div>

      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Table */}
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
                Prix unitaire
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Quantité du produit
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Date de création
              </th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>
                Suppression
              </th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{produit.Reference_produit}</td>
                <td style={styles.cell}>{produit.Type_produit}</td>
                <td style={{ ...styles.cell, textAlign: "center" }}>{produit.Prix_produit}</td>
                <td style={{ ...styles.cell, textAlign: "center" }}>{produit.Qte_produit}</td>
                <td style={{ ...styles.cell, textAlign: "center" }}>{produit.Date_entre}</td>
                <td
                  style={{
                    ...styles.cell,
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => openDeleteModal(produit)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <FaTrash style={{ fontSize: "15px" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de suppression */}
      {showDeleteModal && selectedProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeButton} onClick={closeDeleteModal}>
              ×
            </button>
            <h2 style={{ marginTop: 0 }}>Supprimer produit</h2>
            <p>
              Vous essayez de supprimer le produit "{selectedProduct.Reference_produit}".
            </p>
            <p>Pour confirmer la suppression, saisissez "{currentUsername}" dans le champ suivant et validez :</p>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              style={styles.input}
            />
            <button style={styles.deleteButton} onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  headerCell: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f9f9f9",
  },
  cell: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  row: {
    backgroundColor: "#fff",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    width: "400px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Produits;
