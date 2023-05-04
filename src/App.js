import React, { useState } from "react";
import './App.css';
import { Login } from "./pages/Login";
import { Register } from "./components/Register";
import AppRoutes from "./AppRoutes"





function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <AppRoutes/>
    </div>
  );
}

export default App;