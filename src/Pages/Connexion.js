import React, { useState }  from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Connexion = () => {

  const navigate = useNavigate();
  const [username, setUser] = useState('');
  const { setEmailUser } = useAuth();
  const [passwordUser, setPasswordUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setUsername } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnexion = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !passwordUser) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setSuccessMessage('');
      setIsLoading(false);
    } else {
      try {
        const myConnexion = {
          Username: username,
          Password_user: passwordUser,
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(myConnexion),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch('https://packaging-backend-ccd132e45603.herokuapp.com/connexionUser', options);

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setUsername(responseData.Username);
          setEmailUser(responseData.Email_user);

          // Storing Username in local storage
          localStorage.setItem('Username', responseData.Username);

          navigate('/ventes');
        } else {
          throw new Error("Une erreur s'est produite");
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage('Informations incorrectes');
        setSuccessMessage('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '97vh', backgroundColor: '#F4F4F4' }}>
      {/* Section de gauche */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#17549A',
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
            src="https://i.postimg.cc/6qVTwcCS/Whats-App-Image-2024-12-06-at-8-39-25-PM.jpg" // Remplace par le lien de ton logo
            alt="Logo"
            style={{ width: 90, height: 90 }}
          />
          <div>
        </div>
        </div>

        <div style={{ height: "100px" }}></div>

        {/* Contenu central */}
        <img
          src="https://png.pngtree.com/png-vector/20231017/ourmid/pngtree-box-package-delivery-3d-illustration-png-image_10201455.png" // Remplace par une image de colis
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
          <h2>Salut à nouveau !</h2>
          <p>Pour vous connecter, veuillez entrer vos identifiants.</p>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form style={{ width: '100%', maxWidth: 400 }}>
          <input
            type="username"
            placeholder="Nom d'utilisateur"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            style={{ ...inputStyle, marginBottom: '15px', width: '100%' }}
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
          />
          
          <button onClick={handleConnexion} disabled={isLoading}
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
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        <p style={{ marginTop: 20 }}>
          Vous n'avez pas de compte ? <a href="/inscription" style={{ color: '#17549A', fontWeight: "bold" }}>Inscrivez-vous</a>
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

export default Connexion;
