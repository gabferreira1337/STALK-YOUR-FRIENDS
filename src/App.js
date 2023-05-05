import React, { useState } from "react";
import './styles/App.css';
//import '../src/pages/login.css';
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