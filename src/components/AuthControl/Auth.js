import React, { useState, useEffect, createContext } from "react";
import firebase from "../Config/Config";

export const fireAuth = firebase.auth();

export const AuthContext = createContext();
//AuthContext 생성

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  //firebase Auth 관찰자 설정
  useEffect(() => {
    fireAuth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
