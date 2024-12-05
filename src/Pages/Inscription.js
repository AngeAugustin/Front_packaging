import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {
  const navigate = useNavigate();

  const [nameUser, setNameUser] = useState('');
  const [firstnameUser, setFirstnameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [telephoneUser, setTelephoneUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [confirmPasswordUser, setConfirmPasswordUser] = useState('');
  const [Username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInscription = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (!nameUser || !firstnameUser || !emailUser || !telephoneUser || !passwordUser || !confirmPasswordUser) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
      return;
    }

    if (passwordUser !== confirmPasswordUser) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      setSuccessMessage('');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(emailUser)) {
      setErrorMessage('Adresse email invalide.');
      setSuccessMessage('');
      return;
    }

    if (!phoneRegex.test(telephoneUser)) {
      setErrorMessage('Numéro de téléphone invalide.');
      setSuccessMessage('');
      return;
    }

    try {

      const myInscription = {
        Name_user: nameUser,
        Firstname_user: firstnameUser,
        Telephone_user: telephoneUser,
        Email_user: emailUser,
        Password_user: passwordUser, // Mot de passe inclus
        Username: firstnameUser,
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(myInscription),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`https://packaging-backend-ccd132e45603.herokuapp.com/inscriptionUser`, options);

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSuccessMessage('Inscription réussie !');
        setErrorMessage('');
        navigate('/connexion');
      } else {
        throw new Error('Une erreur s\'est produite');
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage('Données incorrectes ou déjà existante. ');
      setSuccessMessage('');
    }
  };

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
            <h2 style={{ marginTop: 15, fontSize: '19px' }}>Packaging</h2>
          </div>
        </div>

        <div style={{ height: '100px' }}></div>

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
              height: 50,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <h2>Bienvenue à Packaging !</h2>
          <p>Pour vous inscrire, veuillez remplir les champs suivants.</p>
        </div>
        <div style={{ height: '5px' }}></div>
        <style>{keyframes}</style>
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        {successMessage && <p style={successStyle}>{successMessage}</p>}
        <div style={{ height: '5px' }}></div>
        <form onSubmit={handleInscription} style={{ width: '100%', maxWidth: 400 }}>
          <input
            type="text"
            placeholder="Nom"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Prénoms"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={firstnameUser}
            onChange={(e) => setFirstnameUser(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Numéro de téléphone"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={telephoneUser}
            onChange={(e) => setTelephoneUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={confirmPasswordUser}
            onChange={(e) => setConfirmPasswordUser(e.target.value)}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#882904',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            S'inscrire
          </button>
        </form>
        <p style={{ marginTop: 20 }}>
          Vous avez déjà un compte ?{' '}
          <a href="/connexion" style={{ color: '#882904', fontWeight: 'bold' }}>
            Connectez-vous
          </a>
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

const errorStyle = {
  color: 'red',
  margin: '10px 0',
};

const successStyle = {
  color: 'green',
  margin: '10px 0',
};

const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export default Inscription;
