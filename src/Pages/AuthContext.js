import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [Id_user, setId_user] = useState(null);

  return (
    <AuthContext.Provider value={{ Id_user, setId_user }}>
      {children}
    </AuthContext.Provider>
  );
};
