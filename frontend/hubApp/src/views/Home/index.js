import React, { useState } from "react";
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
  IconButton,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const drawerWidth = window.innerWidth / 6;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    // flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    flexGrow: 1,
    width: window.innerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', 
  },
}));

const Home = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {
    return <Login />;
  }

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

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
      <NavBar onClickMenu={toggleDrawer} />
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={() => toggleDrawer(false)}>
            <ChevronLeftIcon style={{
              color: 'white'
            }}/>
          </IconButton>
        </Toolbar>
        <TagsBar onClick={toggleDrawer} />
      </Drawer>
      <Container className={classes.content}>
        <Toolbar />
        <CreatePost />
        <Posts />
      </Container>
    </div>
  );
};

export default Home;
