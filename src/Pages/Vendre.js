import React, { useState } from "react";
import { Link } from "react-router-dom";

const Vendre = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        product: "",
        unitPrice: 0,
        quantity: 0,
        paymentMode: "",
      });
    
      const [ticket, setTicket] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const generateTicket = () => {
        const total = formData.unitPrice * formData.quantity;
        setTicket({
          productName: formData.product,
          customerName: formData.fullName,
          unitPrice: formData.unitPrice,
          quantity: formData.quantity,
          total: total,
          paymentMode: formData.paymentMode,
        });
      };

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", padding: "20px", height: "400px" }}>
      {/* Header section with flex layout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ margin: 0 }}>Ventes</h2>
          <p style={{ color: "#555", margin: 0 }}>Vendre un produit</p>
        </div>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div> {/* Légère et moins large */}

      <div style={{ height: "10px" }}></div>

      <div style={styles.mainContainer}>
        {/* Container gauche */}
        <div style={styles.verticalContainer}>
          <div style={styles.section}>
            <h3 style={styles.heading}>Informations du client</h3>
            <input
              type="text"
              name="fullName"
              placeholder="Noms et prénoms"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Numéro de téléphone"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.section}>
            <h3 style={styles.heading}>Choix du produit</h3>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Sélection produit</option>
              <option value="Packaging artisanal">Packaging artisanal</option>
              <option value="Autre produit">Autre produit</option>
            </select>
            <input
              type="number"
              name="unitPrice"
              placeholder="Prix unitaire"
              value={formData.unitPrice}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantité"
              value={formData.quantity}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Container droit */}
        <div style={styles.verticalContainer}>
          <div style={styles.section}>
            <h3 style={styles.heading}>Paiement</h3>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Mode de paiement</option>
              <option value="Carte">Carte</option>
              <option value="Espèces">Espèces</option>
              <option value="Virement">Virement</option>
            </select>
            <button
              onClick={generateTicket}
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7a482f")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#9a5d3f")}
            >
              Générer un ticket
            </button>
          </div>

          {ticket && (
            <div style={styles.section}>
              <h3 style={{ ...styles.heading, ...styles.ticketHeading }}>
                Ticket
              </h3>
              <p>Achat de : {ticket.productName}</p>
              <p>Par : {ticket.customerName}</p>
              <p>Prix unitaire : {ticket.unitPrice}€</p>
              <p>Quantité : {ticket.quantity}</p>
              <p>Total à payer : {ticket.total}€</p>
              <p>Paiement par : {ticket.paymentMode}</p>
              <Link to="/ventes">
              <button
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#7a482f")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "#9a5d3f")
                }
                onClick={() => window.print()}
              >
                Imprimer
              </button>
              </Link>
              
            </div>
          )}
        </div>
      </div>   
      
    </div>
  );
};

const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: "#f9f9f7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    mainContainer: {
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",  // Ajout du défilement vertical
      },
    verticalContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      flex: 1,
    },
    section: {
      backgroundColor: "#fdfdfb",
      borderRadius: "10px",
      padding: "20px",
      flex: 1,
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      marginBottom: "20px",
      color: "black",
    },
    input: {
      width: "100%",
      marginBottom: "15px",
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      backgroundColor: "#882904",
      color: "white",
      fontWeight: "bold",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    ticket: {
      textAlign: "center",
      color: "#882904",
    },
    ticketHeading: {
      color: "black",
    },
  };



export default Vendre;
