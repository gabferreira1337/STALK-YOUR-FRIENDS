import React, {useEffect, useContext,useState} from "react"
import { AuthContext } from "../contexts/auth";

import { getUsers } from "../services/api";



const HomePage = () => {

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
    <h1>Hello</h1>
    <button onClick={handleLogout}>Logout</button>
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

export default HomePage;