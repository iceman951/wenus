import React from "react";
import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TagsBar from "./TagsBar";
import { useSelector } from "react-redux";
import Login from "../LoginPage/index";

const WINDOW_HEIGHT = window.innerHeight;
const Home = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {
    return <Login />;
  }
  return (
    <div
      style={{
        backgroundImage: `url(/assets/images/bg1.jpg)`
      }}
    >
      <NavBar />
      <TagsBar />
      <CreatePost />
      <Posts />
    </div>
  );
};

export default Home;
