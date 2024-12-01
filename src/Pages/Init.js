import React, { useState } from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Init = () => {
  const navigate = useNavigate();

  const [typeProduit, setTypeProduit] = useState('');
  const [qteProduit, setQteProduit] = useState('');
  const [prixProduit, setPrixProduit] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { Username } = useAuth();

  const handleInit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (!typeProduit || !qteProduit || !prixProduit) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
      return;
    }

    try {

      const reference = 'PA-AT001';

      const myInit = {
        Username: Username,
        Reference_produit: reference,
        Type_produit: typeProduit,
        Qte_produit: qteProduit,
        Prix_produit: prixProduit,
        Date_entre: new Date().toISOString(), 
        Heure_entre: new Date().toISOString(),
        Statut_produit: 'Initialisé'
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(myInit),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`https://localhost:8000/initProduit/${Username}`, options);

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSuccessMessage('Produit créé avec succès !');
        setErrorMessage('');
        navigate('/produits');
      } else {
        throw new Error('Une erreur s\'est produite');
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage('Erreur lors de la création du produit. Produit déjà existant.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", height: "400px" }}>
      {/* Header section with flex layout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div> 
          <h2 style={{ margin: 0 }}>Produits</h2>
          <p style={{ color: "#555", margin: 0 }}>Créer mes produits </p>
        </div>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div> {/* Légère et moins large */}

      <div style={{ height: "10px" }}></div>

      {/* Section de droite */}
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
         
          <h3>Informations du produit à créer</h3>
    
        </div>
        <div style={{ height: '5px' }}></div>
        <style>{keyframes}</style>
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        {successMessage && <p style={successStyle}>{successMessage}</p>}
        <div style={{ height: '5px' }}></div>
        <form onSubmit={handleInit} style={{ width: '100%', maxWidth: 400 }}>
         <select
            placeholder="Type de produit"
            style={{ ...inputStyle, marginBottom: '15px', width: '420px' }}
            value={typeProduit}
            onChange={(e) => setTypeProduit(e.target.value)}
            >
            <option value="" disabled selected>
                Type de produit
            </option>
            <option value="Packaging artisanal">Packaging artisanal</option>
          </select>

          <input
            type="prix"
            placeholder="Prix unitaire"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={prixProduit}
            onChange={(e) => setPrixProduit(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantité"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            min="1" // Définit la quantité minimale
            step="1" // Incrémente par 1
            value={qteProduit}
            onChange={(e) => setQteProduit(e.target.value)}
            />
          
          <button
            type="submit"
            style={{
              width: '422px',
              padding: '10px',
              backgroundColor: '#882904',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            Créer le produit
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


export default Init;
