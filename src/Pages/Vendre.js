import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js'; 

const Vendre = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    product: "",
    unitPrice: "",
    quantity: "",
    paymentMode: "",
    emailClient: "",
    nameClient: "",
    firstnameClient: "",
    telephoneClient: "",
    montantPercu: "",
    reliquat: "",
    typeClient: "",
  });

  const [referenceProduit, setReferenceProduit] = useState("");
  const [ticket, setTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { Username } = useAuth();

  const [isMontantPercuValid, setIsMontantPercuValid] = useState(true); // État pour vérifier la validité du montant perçu
  const [productTypes, setProductTypes] = useState([]); // Nouvel état pour stocker les types de produits

  // Récupérer les types de produits depuis le backend
  const fetchProductTypes = async () => {
    try {
      const response = await fetch("https://backend-packaging-4c79ed1cf149.herokuapp.com/allproducts");
      if (response.ok) {
        const data = await response.json();
        setProductTypes(data); // Stocker les types de produits dans l'état
      } else {
        console.error("Erreur lors de la récupération des types de produits.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  useEffect(() => {
    fetchProductTypes(); // Appeler la fonction au moment du montage du composant
  }, []);

  const fetchProduitDetails = async (typeProduit) => {
    try {
      const response = await fetch(
        `https://backend-packaging-4c79ed1cf149.herokuapp.com/search/${typeProduit}?Type_produit=${typeProduit}`
      );
      if (response.ok) {
        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          product: typeProduit,
          unitPrice: data.Prix_produit,
        }));
        setReferenceProduit(data.Reference_produit);
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

    if (name === "typeClient") {
      handleTypeClientChange(value);
      return;
    }

    if (name === "product" && value) {
      fetchProduitDetails(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Vérification pour "Montant perçu" : s'il est inférieur au total
    if (name === "montantPercu") {
      const total = formData.unitPrice * formData.quantity;
      setIsMontantPercuValid(parseFloat(value) >= total);
    }
  };

  const handleTypeClientChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      typeClient: value,
      nameClient: "",
      firstnameClient: "",
      emailClient: "",
      telephoneClient: "",
    }));
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const generateTicket = () => {
    const total = formData.unitPrice * formData.quantity;
    const reliquat = parseFloat(formData.montantPercu) < total ? total - parseFloat(formData.montantPercu) : 0;

    const ticketData = {
      codeFact: "REF" + Math.floor(Math.random() * 1000000),
      productName: formData.product,
      date: new Date().toLocaleDateString(),
      nameClient: formData.nameClient,
      firstnameClient: formData.firstnameClient,
      emailClient: formData.emailClient,
      telephoneClient: formData.telephoneClient,
      unitPrice: formData.unitPrice,
      quantity: formData.quantity,
      total: total,
      montantPercu: formData.montantPercu,
      reliquat: reliquat,
      paymentMode: formData.paymentMode,
    };

    setTicket(ticketData);
    setSuccessMessage("Ticket généré avec succès !");
  };

  const handlePrint = () => {
    printJS({
      printable: ticket,
      type: 'json',
      properties: ['productName', 'nameClient', 'unitPrice', 'quantity', 'total', 'montantPercu', 'reliquat'],
      header: 'Ticket de Vente',
    });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Ticket de Vente', 14, 10);
    doc.text(`Produit: ${ticket.productName}`, 14, 20);
    doc.text(`Total: ${ticket.total} FCFA`, 14, 30);
    doc.text(`Montant Perçu: ${ticket.montantPercu} FCFA`, 14, 40);
    doc.text(`Reliquat: ${ticket.reliquat} FCFA`, 14, 50);
    doc.save('ticket_vente.pdf');
  };

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", padding: "20px", height: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div> 
          <h2 style={{ margin: 0 }}>Ventes</h2>
          <p style={{ color: "#555", margin: 0 }}>Vendre un produit </p>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      <div style={styles.container}>
        {currentStep === 1 && (
          <div style={styles.section}>
            <h3 style={styles.heading}>Informations du client</h3>
            <select
              name="typeClient"
              value={formData.typeClient}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Type de client</option>
              <option value="Entreprise">Entreprise</option>
              <option value="Particulier">Particulier</option>
            </select>
            <input
              name="nameClient"
              placeholder="Nom du client"
              value={formData.nameClient}
              onChange={handleChange}
              style={styles.input}
              disabled={formData.typeClient === "Particulier"}
            />
            <input
              name="firstnameClient"
              placeholder="Prénoms du client"
              value={formData.firstnameClient}
              onChange={handleChange}
              style={styles.input}
              disabled={formData.typeClient === "Particulier"}
            />
            <input
              name="telephoneClient"
              placeholder="Numéro de téléphone"
              value={formData.telephoneClient}
              onChange={handleChange}
              style={styles.input}
              disabled={formData.typeClient === "Particulier"}
            />
            <input
              name="emailClient"
              placeholder="Adresse e-mail"
              value={formData.emailClient}
              onChange={handleChange}
              style={styles.input}
              disabled={formData.typeClient === "Particulier"}
            />
            <div style={{ height: "5px" }}></div>
            <button onClick={nextStep} style={styles.grayButton}>
              Suivant
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div style={styles.section}>
            <h3 style={styles.heading}>Choix du produit et Paiement</h3>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Sélectionnez un produit</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              name="unitPrice"
              placeholder="Prix unitaire"
              value={formData.unitPrice}
              onChange={handleChange}
              style={styles.input}
              disabled
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
            <input
              name="montantPercu"
              placeholder="Montant perçu"
              value={formData.montantPercu}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: !isMontantPercuValid ? 'red' : '#ddd', // Appliquer bordure rouge si montant perçu est invalide
              }}
            />
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
            <div style={{ height: "5px" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={prevStep} style={styles.grayButton}>
                Précédent
              </button>
              <button onClick={generateTicket} style={styles.grayButton}>
                Suivant
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && ticket && (
          <div style={styles.section}>
            <h3 style={styles.heading}>Ticket de vente</h3>
            <div style={styles.ticketContainer}>
              <div>
                <p><strong>Code Facture :</strong> {ticket.codeFact}</p>
                <p><strong>Produit :</strong> {ticket.productName}</p>
                <p><strong>Date :</strong> {ticket.date}</p>
              </div>
              <div>
                <p><strong>Nom :</strong> {ticket.nameClient}</p>
                <p><strong>Prénom :</strong> {ticket.firstnameClient}</p>
                <p><strong>Email :</strong> {ticket.emailClient}</p>
                <p><strong>Téléphone :</strong> {ticket.telephoneClient}</p>
              </div>
              <div>
                <p><strong>Prix unitaire :</strong> {ticket.unitPrice}FCFA</p>
                <p><strong>Quantité :</strong> {ticket.quantity}</p>
                <p><strong>Total :</strong> {ticket.total}FCFA</p>
                <p><strong>Montant perçu :</strong> {ticket.montantPercu}FCFA</p>
                <p><strong>Reliquat :</strong> {ticket.reliquat}FCFA</p>
                <p><strong>Paiement :</strong> {ticket.paymentMode}</p>
              </div>
              <div style={styles.messageContainer}>
                {successMessage && (
                  <p style={styles.successMessage}>{successMessage}</p>
                )}
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
              </div>
            </div>
            <button onClick={handlePrint} style={styles.grayButton}>Imprimer</button>
            <button onClick={handleDownload} style={styles.grayButton}>Télécharger en PDF</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  section: {
    marginBottom: '20px',
  },
  heading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  grayButton: {
    backgroundColor: '#ddd',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  ticketContainer: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  messageContainer: {
    marginTop: '20px',
  },
  successMessage: {
    color: 'green',
  },
  errorMessage: {
    color: 'red',
  }
};

export default Vendre;
