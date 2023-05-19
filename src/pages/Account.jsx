import React, {useEffect, useContext,useState} from "react"
import { AuthContext } from "../contexts/auth";
import NavbAuth from "../components/Navbar_auth";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { getUsers } from "../services/api";
import UserLocationComponent from "../components/UserHistory";



 const AccountPage = () => {

  const {logout} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  if(loading){
    <div className="loading">Loading data...</div>;
  }

  return (

  <>
    <NavbAuth/>
    <UserLocationComponent/>
       
  </>

  );

};

export default AccountPage;