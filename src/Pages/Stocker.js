import React, { useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Stocker = () => {
  const navigate = useNavigate();

  const [typeProduit, setTypeProduit] = useState('');
  const [qteProduit, setQteProduit] = useState('');
  const [prixProduit, setPrixProduit] = useState('');
  const [referenceProduit, setReferenceProduit] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { Username } = useAuth();

    const [productTypes, setProductTypes] = useState([]); 

  // Nouvelle fonction pour récupérer les détails du produit
  const fetchProductDetails = async (type) => {
    try {
      const response = await fetch(`https://backend-packaging-4c79ed1cf149.herokuapp.com/search/${type}?Type_produit=${type}`);
      if (response.ok) {
        const data = await response.json();
        setReferenceProduit(data.Reference_produit); // Met à jour la référence
        setPrixProduit(data.Prix_produit); // Met à jour le prix
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erreur lors de la récupération des données.");
        setReferenceProduit('');
        setPrixProduit('');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Erreur de connexion avec le serveur.");
    }
  };

  const handleStocker = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (!typeProduit || !qteProduit || !prixProduit) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
      return;
    }

    try {
      const myStocker = {
        Username: Username,
        Reference_produit: referenceProduit,
        Type_produit: typeProduit,
        Qte_produit: qteProduit,
        Prix_produit: prixProduit,
        Date_entre: new Date().toISOString(), 
        Heure_entre: new Date().toISOString(),
        Statut_produit: 'Ajouté'
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(myStocker),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`https://backend-packaging-4c79ed1cf149.herokuapp.com/stockerProduit/${Username}/${referenceProduit}`, options);

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSuccessMessage('Produit stocké avec succès !');
        setErrorMessage('');
        navigate('/stocks');
      } else {
        throw new Error('Une erreur s\'est produite');
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage('Erreur lors du stockage du produit.');
      setSuccessMessage('');
    }
  };

  // Récupération des types de produits via l'API
    useEffect(() => {
      const fetchProductTypes = async () => {
        try {
          const response = await fetch('https://backend-packaging-4c79ed1cf149.herokuapp.com/allproducts');
          if (response.ok) {
            const data = await response.json();
            setProductTypes(data); // Assumons que data est un tableau de types de produits
          } else {
            console.error("Erreur lors de la récupération des types de produits.");
          }
        } catch (error) {
          console.error("Erreur réseau :", error);
        }
      };
  
      fetchProductTypes();
    }, []); // Ce useEffect se déclenche au montage du composant

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setTypeProduit(selectedType);
    if (selectedType) {
      fetchProductDetails(selectedType); // Récupère les détails du produit
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", height: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div> 
          <h2 style={{ margin: 0 }}>Stocks</h2>
          <p style={{ color: "#555", margin: 0 }}>Compléter le stock</p>
        </div>
      </div>

      <div style={{ height: "5px" }}></div>
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div> 
      <div style={{ height: "10px" }}></div>

      <div
        style={{
          flex: 1,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3>Informations du stock à ajouter</h3>
        </div>
        <div style={{ height: '5px' }}></div>
        <style>{keyframes}</style>
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        {successMessage && <p style={successStyle}>{successMessage}</p>}
        <div style={{ height: '5px' }}></div>
        <form onSubmit={handleStocker} style={{ width: '100%', maxWidth: 400 }}>


          <select
              name="product" 
              value={formData.product}
              onChange={handleTypeChange}
              style={styles.input}
            >
              <option value="">Sélectionner un produit</option>
              {productTypes.map((product, index) => (
                <option key={index} value={product.Type_produit}>
                  {product.Type_produit}
                </option>
              ))}
            </select>

          <input
            type="text"
            placeholder="Prix unitaire"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={prixProduit} // Rempli automatiquement
            readOnly // Empêche la modification
          />
          <input
            type="number"
            placeholder="Quantité"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            min="1"
            step="1"
            value={qteProduit}
            onChange={(e) => setQteProduit(e.target.value)}
          />
          
          <button
            type="submit"
            style={{
              width: '422px',
              padding: '10px',
              backgroundColor: '#17549A',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            Compléter le stock 
          </button>

        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px',
};

const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const errorStyle = {
  color: 'red',
  margin: '10px 0',
};

const successStyle = {
  color: 'green',
  margin: '10px 0',
};

export default Stocker;
