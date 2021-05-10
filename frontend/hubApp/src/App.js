import "./App.css";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";

function App() {
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState(storedJwt || null);
  const [fetchError, setFetchError] = useState(null);
  console.log("--------", storedJwt)

  if (!jwt) {
    return (
      <div>
        <LoginForm setJwt={setJwt} />
        <RegisterForm />
      </div>
    );
  }
  else{
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
