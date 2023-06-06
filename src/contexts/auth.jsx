import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession, createUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // pass everything inside AuthProvider with props children

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // user != NULL authenticated = true
  // !! = cast to boolean

  useEffect(() => {
    const recoveredUser = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");

    if (recoveredUser && token) {
      setUser(recoveredUser);
      api.defaults.headers.Authorization = " ${token}";
    }

    setLoading(false);
  }, []);

  const register = async (username, password) => {
    try {
      const response = await createUser(username, password);

      navigate("/login");
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await createSession(username, password);
      const loggedUser = response.username;
      const token = response.token;

      sessionStorage.setItem("username", JSON.stringify(loggedUser)); //save in the session storage

      sessionStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(loggedUser);

      navigate("/");
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("username"); // remove form  session storage the credentials
    sessionStorage.removeItem("token");

    api.defaults.headers.Authorization = null; //set authorization to null;

    setUser(null);
    navigate("/login");
  };

  // store if user is authenticated , username , login , logout , register methods and loading values (!! boolean test)
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
