import React from "react";

import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";

import "./styles/global.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
