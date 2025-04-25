import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa"; // Icônes
import { Link } from "react-router-dom";

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);

  // Récupérer les produits depuis l'API
  useEffect(() => {
    fetch(`https://slategrey-mouse-364952.hostingersite.com/Back_packaging/public/produits`)
      .then((res) => res.json())
      .then((data) => {
        setProduits(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fonction pour afficher le menu de confirmation
  const handleShowConfirmation = (Reference_produit) => {
    setSelectedProduit(Reference_produit);
    setShowConfirmation(true);
  };

  // Fonction pour fermer le menu de confirmation
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedProduit(null);
  };

  // Fonction pour supprimer un produit
  const handleDelete = () => {
    const url = `https://slategrey-mouse-364952.hostingersite.com/Back_packaging/public/delete?Reference_produit=${selectedProduit}`;
    fetch(url, { method: "GET" }) // Utilise `GET` si ton backend est configuré ainsi
      .then((res) => {
        if (res.ok) {
          // Mise à jour de la liste des produits sans recharger
          setProduits(produits.filter((produit) => produit.Reference_produit !== selectedProduit));
        } else {
          console.error("Erreur lors de la suppression du produit");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        handleCloseConfirmation(); // Fermer le menu après la suppression
      });
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
                    onClick={() => handleShowConfirmation(produit.Reference_produit)} // Afficher la confirmation
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

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <p>Voulez-vous vraiment supprimer le produit ?</p>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
              <button
                onClick={handleDelete}
                style={{ ...styles.button, backgroundColor: "green" }}
              >
                Oui
              </button>
              <button
                onClick={handleCloseConfirmation}
                style={{ ...styles.button, backgroundColor: "gray" }}
              >
                Non
              </button>
            </div>
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
  modal: {
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
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  button: {
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Produits;
