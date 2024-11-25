import React from 'react';
import { Link } from "react-router-dom";

const Inscription = () => {
  return (
    <div style={{ display: 'flex', height: '97vh', backgroundColor: '#F4F4F4' }}>
      {/* Section de gauche */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#882904',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        {/* Logo en haut à gauche */}
        <div style={{ position: 'absolute', top: 40, left: 40 }}>
          <img
            src="/images/logo.png" // Remplace par le lien de ton logo
            alt="Packaging"
            style={{ width: 90, height: 90 }}
          />
          <div>
          <h2 style={{ marginTop: 15, fontSize: "19px" }}>Packaging</h2>
        </div>
        </div>

        <div style={{ height: "100px" }}></div>

        {/* Contenu central */}
        <img
          src="/images/colis.png" // Remplace par une image de colis
          alt="Colis"
          style={{ width: '60%', marginTop: 30 }}
        />
      </div>

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
          <img
            src="/images/avatar.png" // Remplace par un lien pour l'icône utilisateur
            alt="Profil"
            style={{
                width: 50,
                height: 50, // La hauteur doit être égale à la largeur
                borderRadius: '50%',
                objectFit: 'cover', // Assure que l'image est bien contenue dans le cercle
              }}
          />
          <h2>Bienvenue à Packaging !</h2>
          <p>Pour vous inscrire, veuillez remplir les champs suivants.</p>
        </div>
        <form style={{ width: '100%', maxWidth: 400 }}>
           <input
            type="nom"
            placeholder="Nom"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          <input
            type="prenom"
            placeholder="Prénoms"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          <input
            type="email"
            placeholder="Email"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          <input
            type="tel"
            placeholder="Numéro de téléphone"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          <input
            type="password"
            placeholder="Mot de passe à nouveau"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
          />
          <Link to="/connexion">
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
            S'inscrire
          </button>
          </Link>
        </form>
        <p style={{ marginTop: 20 }}>
          Vous avez déjà un compte ? <a href="/connexion" style={{ color: '#882904', fontWeight: "bold" }}>Connectez-vous</a>
        </p>
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

export default Inscription;
