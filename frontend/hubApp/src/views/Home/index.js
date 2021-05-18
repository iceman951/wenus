import React from "react";
import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "../../components/Posts";
import TagsBar from "./TagsBar";

import { Grid } from "@material-ui/core";


const Home = () => {

  return (
    <>
      <NavBar />
      <Grid container>
        <TagsBar />
        <CreatePost />
        <Posts />
      </Grid>
    </>
  );
};

export default Home;
