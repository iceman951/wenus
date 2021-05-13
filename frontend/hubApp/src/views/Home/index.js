import React from "react";
import AppBar from "./AppBar";
// import Posts from "../../components/Posts"

const Home = () => {

  return (
    <div
      style={{
        backgroundColor: "#171717",
        height: window.innerHeight,
      }}
    >
      <AppBar />
      <CreatePost />
    </div>
  );
};

export default Home;
