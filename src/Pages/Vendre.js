import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Vendre = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product: "",
    unitPrice: "",
    quantity: "",
    paymentMode: "",
    emailClient: "",
    nameClient: "",
    firstnameClient: "",
    telephoneClient: "",
  });

  const [referenceProduit, setReferenceProduit] = useState("");
  const [ticket, setTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { Username } = useAuth();

  // Fonction pour récupérer les détails du produit via l'API
  const fetchProduitDetails = async (typeProduit) => {
    try {
      const response = await fetch(
        `https://localhost:8000/search/${typeProduit}?Type_produit=${typeProduit}`
      );
      if (response.ok) {
        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          product: typeProduit,
          unitPrice: data.Prix_produit, // Mettre à jour le prix unitaire
        }));
        setReferenceProduit(data.Reference_produit); // Récupérer la référence du produit
      } else {
        console.error("Erreur lors de la récupération des données du produit.");
        setErrorMessage("Produit introuvable ou problème avec l'API.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setErrorMessage("Une erreur s'est produite lors de la connexion à l'API.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si le Type_produit change, récupérer les données depuis l'API
    if (name === "product" && value) {
      fetchProduitDetails(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateTicket = () => {
    const total = formData.unitPrice * formData.quantity;
    setTicket({
      productName: formData.product,
      unitPrice: formData.unitPrice,
      quantity: formData.quantity,
      total: total,
      paymentMode: formData.paymentMode,
      nameClient: formData.nameClient,
      firstnameClient: formData.firstnameClient,
      emailClient: formData.emailClient,
      telephoneClient: formData.telephoneClient,
    });
  };

  const handleVendre = async (e) => {
    if (e) e.preventDefault();

    // Validation des champs
    if (
      !formData.product ||
      !formData.quantity ||
      !formData.unitPrice ||
      !formData.paymentMode ||
      !formData.nameClient ||
      !formData.firstnameClient ||
      !formData.emailClient ||
      !formData.telephoneClient
    ) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setSuccessMessage("");
      return;
    }

    try {
      const codeFact = "FACT" + formData.quantity + "001";
      const customerID =
        formData.firstnameClient + formData.telephoneClient.slice(0, 5);
      const totalFact = formData.unitPrice * formData.quantity;

      const myVendre = {
        Username: Username,
        Reference_produit: referenceProduit, // Utilisation de la référence récupérée
        Type_produit: formData.product,
        Qte_produit: formData.quantity,
        Prix_produit: formData.unitPrice,
        Code_facture: codeFact,
        Date_vente: new Date().toISOString(),
        Heure_vente: new Date().toISOString(),
        Statut_produit: "Vendu",
        Email_client: formData.emailClient,
        Name_client: formData.nameClient,
        Firstname_client: formData.firstnameClient,
        Telephone_client: formData.telephoneClient,
        Customer: customerID,
        Montant_facture: totalFact,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(myVendre),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `https://localhost:8000/vendreProduit/${Username}/${referenceProduit}`,
        options
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSuccessMessage("Produit vendu avec succès !");
        setErrorMessage("");
        navigate("/ventes");
      } else {
        throw new Error("Une erreur s'est produite lors de la vente.");
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Erreur lors de la vente du produit.");
      setSuccessMessage("");
    }
  };

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Ventes</h2>
          <p style={{ color: "#555", margin: 0 }}>Vendre un produit</p>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div style={styles.mainContainer}>
        <div style={styles.verticalContainer}>
          <div style={styles.section}>
            <h3 style={styles.heading}>Informations du client</h3>
            <input
              name="nameClient"
              placeholder="Nom du client"
              value={formData.nameClient}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="firstnameClient"
              placeholder="Prénoms du client"
              value={formData.firstnameClient}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="telephoneClient"
              placeholder="Numéro de téléphone"
              value={formData.telephoneClient}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="emailClient"
              placeholder="Adresse e-mail"
              value={formData.emailClient}
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
              <option value="">Type de produit</option>
              <option value="Packaging artisanal">Packaging artisanal</option>
              <option value="Packaging moderne">Packaging moderne</option>
            </select>
            <input
              name="unitPrice"
              placeholder="Prix unitaire"
              value={formData.unitPrice}
              onChange={handleChange}
              style={styles.input}
              disabled // Désactiver car le prix vient de l'API
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantité"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

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
            <button onClick={generateTicket} style={styles.button}>
              Générer un ticket
            </button>
          </div>

          {ticket && (
            <div style={styles.section}>
              <h3 style={styles.heading}>Ticket</h3>
              <p>Achat de : {ticket.productName}</p>
              <p>Par : {ticket.nameClient} {ticket.firstnameClient}</p>
              <p>Adresse email : {ticket.emailClient} </p>
              <p>Telephone : {ticket.telephoneClient} </p>
              <p>Prix unitaire : {ticket.unitPrice}€</p>
              <p>Quantité : {ticket.quantity}</p>
              <p>Total à payer : {ticket.total}€</p>
              <p>Paiement par : {ticket.paymentMode}</p>
              <button
                style={styles.button}
                onClick={handleVendre}
              >
                Valider la vente
              </button>
            </div>
          )}
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flex: 1,
  },
  section: {
    padding: "20px",
    backgroundColor: "#fdfdfb",
    borderRadius: "10px",
  },
  heading: {
    marginBottom: "20px",
    color: "black",
  },
  input: {
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
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
};

export default Vendre;
