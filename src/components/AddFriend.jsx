import axios from "axios";
import { useState, useEffect,useRef } from 'react';
import { addFriend, api } from '../services/api';
import '../styles/FriendsList.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';





export default function AddFriend() {


  const [userFriend, setUserFriend] = useState();


  const handle_Click = () => {
   // console.log(userFriend);
   
    addFriend(userFriend);
  

  }



  return (

  <>
   <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" value={userFriend} onChange={(e) => setUserFriend(e.target.value)}/>
  <div class="input-group">
    <button class="btn btn-outline-secondary" type="button" onClick={handle_Click}>ADD FRIEND</button>
  </div>
  </div>
    </>
  );
}