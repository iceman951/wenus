import "./App.css";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken} />
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
