import React, { useState, useEffect, useContext } from "react";
import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TagsBar from "./TagsBar";
import {
  Container,
  Drawer,
  makeStyles,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { SocketContext } from "../../context/socket";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const Home = () => {
  const classes = useStyles();
  const socket = useContext(SocketContext);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ",socket.id);
    });

    return () => {
      socket.emit('disconnect')
    };
  }, []);

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
        overflowX: 'hidden',
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
            <ChevronLeftIcon
              style={{
                color: "white",
              }}
            />
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
