import React, { useState, useEffect, useRef, Table } from "react";
import { getHistory, getUserInfo, deletePosition } from "../services/api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getsos } from "../services/api";
import "../styles/SOS.css";

export default function SOS({userData}) {

  
  let data;
  const [sos, setSos] = useState([]);

  useEffect(() => {
  //  getsos();
  
  userData.forEach(username => {

    //console.log(username.username);


   getsos(username.username)
   .then((sosArray)=>{
    const filteredSosArray = sosArray.filter((sosObj) => sosObj.username === username);

   // console.log(sosArray[0].sos)


     data = {
      username: sosArray[0].username,
      sos: sosArray[0].sos,
    }

    setSos((prevData) => [...prevData, data]);
    console.log(sos);
   })
   
   .catch((error)=>{
    //console.error(error);
   })
    
  });


    // Fetch locations every 5 seconds (adjust the interval as needed)
   /* const intervalId = setInterval(getsos, 5000000);

    //Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };*/
  }, []);


  

  return (
    <>
      {sos.map((item, index) => (
        <Button
          key={index}
          className="btn btn-sm btn-danger"
        >
          {`Utilizador ${item.username} ativou modo sos`}
        </Button>
      ))}
    </>
  )
}
