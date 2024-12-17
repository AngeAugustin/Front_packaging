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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Notifications</h2>
          <p style={{ color: "#555", margin: 0 }}>Gérer mes notifications</p>
        </div>
      </div>

      {/* Line separator */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}></div>

      {/* Notification flags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                minWidth: "250px",
                maxWidth: "300px",
                flex: "1 1 calc(25% - 15px)", // Pour disposer les flags horizontalement
                boxSizing: "border-box",
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
          <p style={{ color: "#555", textAlign: "center", width: "100%" }}>
            Aucune notification disponible
          </p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
