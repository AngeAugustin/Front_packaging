import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa"; // Icônes de vente et de suppression
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';

const Ventes = () => {
  const [ventes, setVentes] = useState([]);
  const [typeClient, setTypeClient] = useState("Entreprise"); // Par défaut "Entreprise"
  const [showConfirmation, setShowConfirmation] = useState(false); // État pour afficher la modale de confirmation
  const [productToDelete, setProductToDelete] = useState(null); // Stocke le produit sélectionné pour la suppression
  const { Username } = useAuth();

  useEffect(() => {
    if (Username) {
      fetch(`https://packaging-backend-ccd132e45603.herokuapp.com/ventes/${Username}/${typeClient}`)
        .then((res) => res.json())
        .then((data) => {
          setVentes(data);
        })
        .catch((err) => console.log(err));
    }
  }, [Username, typeClient]); // Dépendance au typeClient

  const handleDelete = (Reference_produit, Qte_produit, Date_vente, Prix_produit, Type_produit) => {
    // Construction de l'URL avec les paramètres dans la route
    const url = `https://packaging-backend-ccd132e45603.herokuapp.com/annulerProduit/${Username}/${Date_vente}/${Reference_produit}/${Qte_produit}/${Prix_produit}/${Type_produit}`;

    fetch(url, {
      method: "POST", // Méthode POST même si les paramètres sont dans l'URL
    })
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour l'état des ventes après la suppression réussie
        if (data.message) {
          setVentes(ventes.filter((vente) => vente.Reference_produit !== Reference_produit || vente.Date_vente !== Date_vente));
          alert("Produit annulé avec succès");
        } else {
          alert("Erreur lors de l'annulation du produit");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Erreur lors de la suppression");
      });
  };

  // Afficher la confirmation de suppression
  const showDeleteConfirmation = (product) => {
    setProductToDelete(product);
    setShowConfirmation(true);
  };

  // Annuler la suppression
  const cancelDelete = () => {
    setShowConfirmation(false);
    setProductToDelete(null);
  };

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
              backgroundColor: "#004aad",
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
            <FaShoppingCart style={{ marginRight: "10px" }} /> {/* Icône de vente avec un espacement à droite */}
            Vendre un produit
          </button>
        </Link>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Section de boutons pour sélectionner le type de client */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setTypeClient("Entreprise")}
          style={{
            backgroundColor: typeClient === "Entreprise" ? "#004aad" : "#ccc",
            color: typeClient === "Entreprise" ? "white" : "black",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px 0 0 5px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          Entreprise
        </button>
        <button
          onClick={() => setTypeClient("Particulier")}
          style={{
            backgroundColor: typeClient === "Particulier" ? "#004aad" : "#ccc",
            color: typeClient === "Particulier" ? "white" : "black",
            border: "none",
            padding: "10px 20px",
            borderRadius: "0 5px 5px 0",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          Particulier
        </button>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Table container with white background and rounded borders */}
      <div style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...styles.headerCell, textAlign: "left" }}>Référence du produit</th>
              <th style={{ ...styles.headerCell, textAlign: "left" }}>Nom du produit</th>
              <th style={{ ...styles.headerCell, textAlign: "center" }}>Date de vente</th> {/* Centré */}
              <th style={{ ...styles.headerCell, textAlign: "center" }}>Prix Unitaire</th> {/* Centré */}
              <th style={{ ...styles.headerCell, textAlign: "center" }}>Quantité vendue</th> {/* Centré */}
              <th style={{ ...styles.headerCell, textAlign: "center" }}>Montant total</th> {/* Centré */}
              <th style={{ ...styles.headerCell, textAlign: "center" }}>Action</th> {/* Centré */}
            </tr>
          </thead>
          <tbody>
            {ventes.map((vente, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{vente.Reference_produit}</td>
                <td style={styles.cell}>{vente.Type_produit}</td>
                <td style={{ ...styles.cell, textAlign: "center" }}>{vente.Date_vente}</td> {/* Centré */}
                <td style={{ ...styles.cell, textAlign: "center" }}>{vente.Prix_produit}</td> {/* Centré */}
                <td style={{ ...styles.cell, textAlign: "center" }}>{vente.Qte_produit}</td> {/* Centré */}
                <td style={{ ...styles.cell, textAlign: "center" }}>{vente.Prix_produit * vente.Qte_produit}</td> {/* Centré */}
                <td
                  style={{
                    ...styles.cell,
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Icône de suppression */}
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => showDeleteConfirmation(vente)}
                  />
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
            <p>Voulez-vous vraiment supprimer ce produit ?</p>
            <div style={styles.modalButtons}>
              <button onClick={() => handleDelete(productToDelete.Reference_produit, productToDelete.Qte_produit, productToDelete.Date_vente, productToDelete.Prix_produit, productToDelete.Type_produit)} style={styles.modalButton}>Oui</button>
              <button onClick={cancelDelete} style={styles.modalButton}>Non</button>
            </div>
          </div>
        </div>
      )}
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
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  modalButtons: {
    marginTop: "20px",
  },
  modalButton: {
    padding: "10px 20px",
    backgroundColor: "#004aad",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 10px",
  },
};

export default Ventes;
