import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
