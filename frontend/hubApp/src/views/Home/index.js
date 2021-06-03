import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Drawer,
  makeStyles,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import NewPostBar from "./NewPostBar";
import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TagsBar from "./TagsBar";

const drawerWidth = 200;
let WINDOW_WIDTH = window.innerWidth;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  const newPostNumber = useSelector((state) => state.post.newPostNumber);
  const user = useSelector((state) => state.user.user);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
      socket.emit("join-rooms", user.subscribedPosts);
    });

    socket.on("new-comment", () => {
      console.log("new_comment")
    })

    socket.on("debug", (msg) =>{
      console.log("debugSocket", msg)
    })

    return () => {
      // socket.emit('disconnect')
      // socket.disconnect();
    };
  }, [socket]);

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
        overflowX: "hidden",
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
      {newPostNumber !== 0 && (
        <NewPostBar />
      )}
    </div>
  );
};

export default Home;
