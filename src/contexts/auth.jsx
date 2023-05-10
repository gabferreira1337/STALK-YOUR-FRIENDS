import React, {createContext} from "react"
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";


import {api, createSession,createUser} from "../services/api"

export const AuthContext = createContext();   // context is used to save in the memory

export const AuthProvider = ({children}) => {     // pass everything inside AuthProvider with props children

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // user != NULL authenticated = true
// !! = cast to boolean

useEffect(()=> {          // comeca e os componentes sao renderizados sem esperar asincrono

  const recoveredUser = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  if(recoveredUser && token){
    //setUser(JSON.parse(recoveredUser)); //
    setUser(recoveredUser);
    api.defaults.headers.Authorization = ' ${token}';
  }

  setLoading(false);  // ajuda no carregamento da pagina

},[]); // independente do estado


const register = async (username,password) => {

  try {

    const response = await createUser(username,password);
     // console.log("Navigating");
       navigate('/login');
   //   console.log("register", response);
     
   
  } catch (error) {
     console.error('API request error:', error);
   
  }

 };


  const login = async (username, password) => {

   try {
    const response = await createSession(username,password);
    const loggedUser = response.username;
    const token = response.token;
      
     localStorage.setItem("username", JSON.stringify(loggedUser));   //save in the local storage 

     localStorage.setItem("token", token); 


     api.defaults.headers.Authorization = `${token}`;

     
      setUser(loggedUser);
     // console.log("Navigating");
       navigate('/');
     
   //  console.log("Login", response);
     
   } catch (error) {
    console.error('API request error:', error);
    
  };
    
      
  };



    

  const logout = () => {
   // console.log("logout");
    localStorage.removeItem("username");   // remove form local storage the credentials
    localStorage.removeItem("token");

    api.defaults.headers.Authorization = null;      //set authorization to null;

    setUser(null);
    navigate("/login");
  };

  return(
  
  <AuthContext.Provider value={{authenticated: !!user, user,loading,register, login, logout}}> 
    {children} 
  </AuthContext.Provider>
  
);

};
