import React from "react";
import "./styles/App.css";
import AppRoutes from "./AppRoutes";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <div className="App container-fluid">
      <AppRoutes />
    </div>
  );
}

export default App;
