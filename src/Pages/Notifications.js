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

      {/* Line separator */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Notification lines */}
      <div>
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <div
              key={index}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #eee", // Ligne de séparation
              }}
            >
              <p style={{ margin: 0, lineHeight: "1.5" }}>
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
              </p>
            </div>
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
