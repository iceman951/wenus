import React from "react";
import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "../../components/Posts";
import TagsBar from "./TagsBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <TagsBar />
      <CreatePost />
      <Posts />
    </>
  );
};

export default Home;
