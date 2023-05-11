import React, {useEffect, useContext,useState} from "react"
import { AuthContext } from "../contexts/auth";
import NavbAuth from "../components/Navbar_auth";
import Mapb from "../components/Mapb";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { getUsers } from "../services/api";



 const AccountPage = () => {

  const {logout} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      (async () => {
        const response = await getUsers();
        setUsers(response.data);
        setLoading(false);

      })();    //funcao anonima
  },[]);

  const handleLogout = () => {

    logout();
  }

  if(loading){
    <div className="loading">Loading data...</div>;
  }

  return (

  <>
    <NavbAuth/>
    <NavbAuth/>
    <h1>Hello</h1>
    <h1>Hello</h1>
    <ul>
      {
        users.map((user) => (
          <li>
            {user._id} - {user.email}
          </li>
        ))
      }
    </ul>
       
  </>

  );

};

