import React, { useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Init = () => {
  const navigate = useNavigate();

  const [typeProduit, setTypeProduit] = useState('');
  const [qteProduit, setQteProduit] = useState('');
  const [prixProduit, setPrixProduit] = useState('');
  const [referenceProduit, setReferenceProduit] = useState('');
  const [usedReferences, setUsedReferences] = useState(new Set());

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { Username } = useAuth();

  // Fonction pour générer une référence unique
  const generateUniqueReference = (typeProduit) => {
    const prefix = typeProduit === "Packaging artisanal" ? "PA-AT" : "PA-MO";
    let randomNumber;

    // Assurez-vous que le numéro est unique
    do {
      randomNumber = Math.floor(100 + Math.random() * 900); // Génère un nombre entre 100 et 999
    } while (usedReferences.has(randomNumber));

    setUsedReferences((prev) => new Set(prev).add(randomNumber)); // Ajoute le numéro à l'ensemble

    return `${prefix}-${randomNumber}`;
  };

  // Met à jour la référence automatiquement lorsqu’un type de produit est sélectionné
  useEffect(() => {
    if (typeProduit) {
      const newReference = generateUniqueReference(typeProduit);
      setReferenceProduit(newReference);
    }
  }, [typeProduit]);

  const handleInit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (!typeProduit || !qteProduit || !prixProduit) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
      return;
    }

    try {
      const myInit = {
        Username: Username,
        Reference_produit: referenceProduit,
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

      const response = await fetch(`https://packaging-backend-ccd132e45603.herokuapp.com/initProduit/${Username}`, options);

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
      {/* Header section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div> 
          <h2 style={{ margin: 0 }}>Produits</h2>
          <p style={{ color: "#555", margin: 0 }}>Créer mes produits </p>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Section principale */}
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
        <h3>Informations du produit à créer</h3>
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        {successMessage && <p style={successStyle}>{successMessage}</p>}
        <form onSubmit={handleInit} style={{ width: '100%', maxWidth: 400 }}>
          <select
            style={{ ...inputStyle, marginBottom: '15px', width: '420px' }}
            value={typeProduit}
            onChange={(e) => setTypeProduit(e.target.value)}
          >
            <option value="" disabled selected>
              Type de produit
            </option>
            <option value="Packaging artisanal">Packaging artisanal</option>
            <option value="Packaging moderne">Packaging moderne</option>
          </select>

          <input
            type="text"
            placeholder="Référence du produit"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={referenceProduit}
            readOnly
          />

          <input
            type="text"
            placeholder="Prix unitaire"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={prixProduit}
            onChange={(e) => setPrixProduit(e.target.value)}
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

const errorStyle = {
  color: 'red',
  margin: '10px 0',
};

const successStyle = {
  color: 'green',
  margin: '10px 0',
};

export default Init;
