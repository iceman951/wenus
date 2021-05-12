import React, { useState } from "react";
import AppBar from "./AppBar";
import PostsInput from "./PostsInput";

const Home = () => {
  // Get Token
  const storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = useState(storedJwt || null);
  

  return (
    <div
      style={{
        backgroundColor: "#424242",
        height: window.innerHeight,
      }}
    >
      <AppBar />
      <h1>Welcome Home Page</h1>
      <PostsInput token={jwt}/>
    </div>
  );
};

export default Home;
