import React from "react";
import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TagsBar from "./TagsBar";
import { useSelector } from "react-redux";
import Login from "../LoginPage/index";
import {
  Container,
  Drawer,
  makeStyles,
  Toolbar,
} from "@material-ui/core";

const drawerWidth = window.innerWidth/6;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    flexGrow: 1,
    width: window.innerWidth - drawerWidth - 100,
  },
}));

const Home = () => {
  const classes = useStyles();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {
    return <Login />;
  }
  return (
    <div
      style={{
        backgroundImage: `url(/assets/images/bg1.jpg)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: window.innerHeight,
      }}
      className={classes.root}
    >
      <NavBar />
      <Container className={classes.content}>
        <Toolbar />
        <CreatePost />
        <Posts />
      </Container>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <TagsBar />
      </Drawer>
    </div>
  );
};

export default Home;
