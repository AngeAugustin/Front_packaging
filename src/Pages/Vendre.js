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
  const [productTypes, setProductTypes] = useState([]);

  const generateParticulierData = () => {
    const randomNumber = Math.floor(100 + Math.random() * 900);
    const generatedName = `Client${randomNumber}`;
    const generatedEmail = `${generatedName.toLowerCase()}@example.com`;
    return {
      nameClient: generatedName,
      firstnameClient: generatedName,
      emailClient: generatedEmail,
      telephoneClient: "0123456789",
    };
  };

  const handleTypeClientChange = (value) => {
    let updatedFields = {};
    if (value === "Particulier") {
      updatedFields = generateParticulierData();
    } else if (value === "Entreprise") {
      updatedFields = {
        nameClient: "",
        firstnameClient: "",
        emailClient: "",
        telephoneClient: "",
      };
    }
    setFormData((prevData) => ({
      ...prevData,
      typeClient: value,
      ...updatedFields,
    }));
  };

  useEffect(() => {
    fetchProductTypes(); // Appeler la fonction au moment du montage du composant
  }, []);

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

  const generateUniqueCodeFact = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `FACT00${randomNum}`;
  };

  const generateTicket = () => {
    const codeFact = generateUniqueCodeFact();
    const total = formData.unitPrice * formData.quantity;
    const currentDate = new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const reliquat = formData.montantPercu - total;

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
      codeFact: codeFact,
      date: currentDate,
      montantPercu: formData.montantPercu,
      reliquat: reliquat,
      typeClient: formData.typeClient,
    });

    setCurrentStep(3);
  };

  const handleVendre = async (e) => {
    if (e) e.preventDefault();

    if (
      !formData.product ||
      !formData.quantity ||
      !formData.unitPrice ||
      !formData.paymentMode ||
      !formData.nameClient ||
      !formData.firstnameClient ||
      !formData.emailClient ||
      !formData.telephoneClient ||
      !formData.montantPercu ||
      !formData.typeClient
    ) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setSuccessMessage("");
      return;
    }

    try {
      const codeFact = generateUniqueCodeFact();
      const customerID = formData.firstnameClient + formData.telephoneClient.slice(0, 5);
      const totalFact = formData.unitPrice * formData.quantity;
      const reliquat = formData.montantPercu - totalFact;

      const myVendre = {
        Username: Username,
        Reference_produit: referenceProduit,
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
        Mode_paiement: formData.paymentMode,
        Montant_percu: formData.montantPercu,
        Reliquat: reliquat,
        Type_client: formData.typeClient,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(myVendre),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `https://backend-packaging-4c79ed1cf149.herokuapp.com/vendreProduit/${Username}/${referenceProduit}`,
        options
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSuccessMessage("Produit vendu avec succès !");
        setErrorMessage("");
        generatePDF();
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

  const generatePDF = () => {
    if (!ticket) return;

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [58, 200]
    });

    // Contenu du PDF (identique à votre code existant)
    const width = 58;
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    const entreprise = {
        adresse: 'Bureau de Poste Cadjèhoun',
        ville: 'Cotonou',
        pays: 'Bénin',
        tel: '+229 01 97 14 53 78',
        email: 'skypemballage@gmail.com',
        rccm: 'RB/ COT/ 21 B 29319',
        ifu: '3 2021 1257 5665',
    };

    const logoUrl = 'https://i.postimg.cc/rFCP5vjM/SKY-P.png';
    doc.addImage(logoUrl, 'JPEG', (width - 20) / 2, 5, 20, 20);

    const gapAfterLogo = 30;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text(`${entreprise.ville} - ${entreprise.adresse}`, width / 2, gapAfterLogo, { align: 'center' });
    doc.text(`${entreprise.tel} - ${entreprise.email}`, width / 2, gapAfterLogo + 4, { align: 'center' });
    doc.text(`RCCM: ${entreprise.rccm} - IFU: ${entreprise.ifu}`, width / 2, gapAfterLogo + 8, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`Facture N° ${ticket.codeFact}`, width / 2, gapAfterLogo + 18, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text(`Date: ${formattedDate}`, 5, gapAfterLogo + 28);
    doc.text(`Vendeur: ${Username}`, 5, gapAfterLogo + 33);

    doc.setFont('helvetica', 'bold');
    doc.text('Informations du client', width / 2, gapAfterLogo + 43, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text(`Client: ${ticket.firstnameClient} ${ticket.nameClient}`, 5, gapAfterLogo + 48);
    doc.text(`Email: ${ticket.emailClient}`, 5, gapAfterLogo + 53);
    doc.text(`Téléphone: ${ticket.telephoneClient}`, 5, gapAfterLogo + 58);
    doc.text(`Mode de paiement: ${ticket.paymentMode}`, 5, gapAfterLogo + 63);

    const tableColumn = ["Produit", "Qté", "P.U", "Total"];
    const tableRows = [
        [ticket.productName, ticket.quantity, `${ticket.unitPrice} `, `${ticket.total} `]
    ];

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: gapAfterLogo + 73,
        margin: { left: 3, right: 3 },
        theme: 'grid',
        styles: {
            fontSize: 9,
            cellPadding: 2,
            fontStyle: 'bold'
        },
        headStyles: {
            fillColor: [23, 84, 154],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 18 },
            1: { cellWidth: 10 },
            2: { cellWidth: 11 },
            3: { cellWidth: 13 }
        }
    });

    const montantPerçuX = 5;
    const reliquatX = 35;
    const yPosition = gapAfterLogo + 123;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text(`Montant perçu: ${ticket.montantPercu} FCFA `, montantPerçuX, yPosition);
    doc.text(`Reliquat: ${ticket.reliquat} FCFA `, reliquatX, yPosition);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('Merci pour votre achat !', width / 2, gapAfterLogo + 145, { align: 'center' });

    // Enregistrement du fichier localement
    const fileName = `Facture_${ticket.codeFact}.pdf`;
    doc.save(fileName); 

    // Génération du PDF en tant que Blob
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Impression directe avec print-js
    printJS({
        printable: pdfUrl,
        type: 'pdf'
    });
  };


  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
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
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={prevStep} style={styles.grayButton}>
                Précédent
              </button>
              <button onClick={handleVendre} style={styles.marronButton}>
                Valider la vente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ); 
};

const styles = {
  errorMessage: {
    color: "red",
    fontWeight: "bold",
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  section: { marginBottom: "0px" },
  heading: { marginBottom: "10px" },
  input: { width: "97%", padding: "10px", margin: "5px 0", fontSize: "16px", borderRadius: "5px", border: "1px solid #ddd" },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  grayButton: {
    backgroundColor: "#ccc",
    color: "black",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  marronButton: {
    backgroundColor: "#004aad",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  ticketContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  messageContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Vendre;
