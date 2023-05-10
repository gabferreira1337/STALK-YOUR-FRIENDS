import React, {useContext} from "react"


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom"     //


import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { AuthProvider, AuthContext } from "./contexts/auth"
import  HomePage   from "./pages/Home"
import  AccountPage   from "./pages/Home"




const AppRoutes = () => {

  
  const Private = ({children}) => {

    const {authenticated, loading} = useContext(AuthContext);
    console.log({authenticated});

    if(loading){
      console.log('hello');
      return <div className="loading">Carregando...</div>;

    }

    
    console.log('hello');

    if(!authenticated){     //if not authenticated
      console.log('hello');
      return <Navigate to="/login"/>;
    }

    return children;

  }

  return(
    <Router>
      <AuthProvider>   
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/" element={<Private><HomePage/></Private>} />
        <Route exact path="/account" element={<Private><AccountPage/></Private>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};


export default AppRoutes;