import React, { useState } from "react";
import './styles/App.css';
//import '../src/pages/login.css';
import { Login } from "./pages/Login";

import AppRoutes from "./AppRoutes"
import Container from 'react-bootstrap/Navbar';
import 'mapbox-gl/dist/mapbox-gl.css';






function App() {

  return (
    <div className="App container-fluid">
      <AppRoutes/>
    </div>
  );
}

export default App;