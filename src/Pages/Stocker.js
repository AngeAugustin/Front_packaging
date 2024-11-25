import React from "react";
import { Link } from "react-router-dom";

const Stocker = () => {

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", height: "400px" }}>
      {/* Header section with flex layout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ margin: 0 }}>Stocks</h2>
          <p style={{ color: "#555", margin: 0 }}>Compléter le stock</p>
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
         
          <h3>Informations du stock à ajouter</h3>
    
        </div>
        <form style={{ width: '100%', maxWidth: 400 }}>
         <select
            placeholder="Type de produit"
            style={{ ...inputStyle, marginBottom: '15px', width: '420px' }}
            >
            <option value="" disabled selected>
                Type de produit
            </option>
            <option value="produit1">Packaging artisanal</option>
            <option value="produit2">Bag packaging</option>
            <option value="produit3">Rectangular packaging</option>
          </select>

          <input
            type="prix"
            placeholder="Prix unitaire"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          <input
            type="number"
            placeholder="Quantité"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            min="1" // Définit la quantité minimale
            step="1" // Incrémente par 1
            />

          <input
            type="montant_total"
            placeholder="Montant total"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          <input
            type="date_entree"
            placeholder="Date d'entrée"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          
          <Link to="/stocks">
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
            Compléter le stock 
          </button>
          </Link>
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


export default Stocker;
