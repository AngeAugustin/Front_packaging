import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`https://packaging-backend-ccd132e45603.herokuapp.com/notifications`)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Déplacer une notification en dernière position
  const handleNotificationClick = (index) => {
    setNotifications((prevNotifications) => {
      const clickedNotification = prevNotifications[index];
      const updatedNotifications = [
        ...prevNotifications.slice(0, index),
        ...prevNotifications.slice(index + 1),
        clickedNotification,
      ];
      return updatedNotifications;
    });
  };

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", padding: "20px" }}>
      {/* Header section */}
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Notifications</h2>
        <p style={{ color: "#555", margin: 0 }}>Gérer mes notifications</p>
      </div>

      <div style={{ height: "5px" }}></div>

      {/* Line separator with lighter color and thinner width */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div> {/* Légère et moins large */}

      <div style={{ height: "10px" }}></div>

      {/* Conteneur blanc pour les notifications */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <button
              key={index}
              onClick={() => handleNotificationClick(index)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                lineHeight: "1.5",
                color: "#333",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e6f7ff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#f9f9f9";
              }}
            >
              L'Utilisateur{" "}
              <span style={{ color: "#007BFF", fontWeight: "600" }}>
                {notif.Username}
              </span>{" "}
              a annulé la vente de{" "}
              <span style={{ color: "#007BFF", fontWeight: "600" }}>
                {notif.Qte_produit}
              </span>{" "}
              du produit{" "}
              <span style={{ color: "#007BFF", fontWeight: "600" }}>
                {notif.Type_produit}
              </span>{" "}
              de référence{" "}
              <span style={{ color: "#007BFF", fontWeight: "600" }}>
                {notif.Reference_produit}
              </span>{" "}
              le{" "}
              <span style={{ color: "#007BFF", fontWeight: "600" }}>
                {notif.Date_annulation}
              </span>
            </button>
          ))
        ) : (
          <p style={{ color: "#555", textAlign: "center" }}>
            Aucune notification disponible
          </p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
