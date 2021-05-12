import React from "react";
import AppBar from "./AppBar";
import CreatePost from "./CreatePost";
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
      {/* <h1>Welcome Home Page</h1> */}
      {/* <PostsInput token={jwt}/> */}
      <CreatePost />
    </div>
  );
};

export default Home;
