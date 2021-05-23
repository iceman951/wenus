import React from "react";
import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TagsBar from "./TagsBar";
import { useSelector } from "react-redux";
import Login from "../LoginPage/index";

const Home = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {
    return <Login />
  }
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
