import React, {createContext} from "react"
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";


import {api, createSession} from "../services/api"

export const AuthContext = createContext();   // context is used to save in the memory

export const AuthProvider = ({children}) => {     // pass everything inside AuthProvider with props children

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // user != NULL authenticated = true
// !! = cast to boolean

useEffect(()=> {          // comeca e os componentes sao renderizados sem esperar asincrono

  const recoveredUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if(recoveredUser && token){
    setUser(JSON.parse(recoveredUser)); //
    api.defaults.headers.Authorization = "Bearer ${token}";
  }

  setLoading(false);  // ajuda no carregamento da pagina

},[]); // independente do estado

  const login = async (username, password) => {

      const response = await createSession(username, password);

      console.log("login", response.data);

      // api criar uma session

      const loggedUser = response.data.user;
      const token = response.data.token;
       
      localStorage.setItem("user", JSON.stringify(loggedUser));   //save in the local storage 

      localStorage.setItem("token", token); 


      api.defaults.headers.Authorization = 'Bearer ${token}';

      
        setUser(loggedUser);
        navigate('/');
      
      
  };


  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");   // remove form local storage the credentials
    localStorage.removeItem("token");

    api.defaults.headers.Authorization = null;      //set authorization to null;

    setUser(null);
    navigate("/login");
  };

  return(
  
  <AuthContext.Provider value={{authenticated: !!user, user,loading, login, logout}}> 
    {children} 
  </AuthContext.Provider>
);

}
