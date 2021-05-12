import React from "react";
import AppBar from "./AppBar";
import PostsInput from "./PostsInput";
import Posts from "../../components/Posts"

const Home = () => {

  return (
    <div
      style={{
        backgroundColor: "#424242",
        height: window.innerHeight,
      }}
    >
      <AppBar />
      {/* <h1>Welcome Home Page</h1> */}
      {/* <PostsInput token={jwt}/> */}
      <Posts />
    </div>
  );
};

export default Home;
