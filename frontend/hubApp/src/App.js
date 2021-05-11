import "./App.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";

import LoginForm from "./components/LoginForm";

function App() {
  const storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = useState(storedJwt || null);

  if (!jwt) {
    return (
      <div>
        <LoginForm setJwt={setJwt} /> 
      </div>

    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
