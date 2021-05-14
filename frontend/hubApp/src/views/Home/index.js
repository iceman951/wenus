import React from "react";
import AppBar from "./AppBar";
import CreatePost from "./CreatePost";
import Posts from "../../components/Posts"
import TagsBar from "./TagsBar";

const Home = () => {

  return (
    <div
      style={{
        backgroundColor: "#171717",
        height: window.innerHeight,
      }}
    >
      <AppBar />
      <TagsBar />
      <CreatePost />
      <Posts />
    </div>
  );
};

export default Home;
