import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [Id_user, setId_user] = useState(null);
  const [Username, setUsername] = useState(null);
  const [Email_user, setEmailUser] = useState(null);

  return (
    <AuthContext.Provider value={{ Id_user, setId_user, Username, setUsername, Email_user, setEmailUser }}>
      {children}
    </AuthContext.Provider>
  );
};
