import React, { useEffect, useContext } from "react";
import {
  Container,
  // Drawer,
  makeStyles,
  // Toolbar,
  // IconButton,
} from "@material-ui/core";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import NewPostBar from "./NewPostBar";
// import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
// import TagsBar from "./TagsBar";
import { getNotifications } from "../../store/actions/notificationAction";

// const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   backgroundColor: theme.palette.background.default,
  //   minHeight: window.innerHeight,
  //   overflowX: "hidden",
  // },
  // drawer: {
  //   width: drawerWidth,
  // },
  // drawerPaper: {
  //   width: drawerWidth,
  //   backgroundColor: theme.palette.background.default,
  // },
  content: {
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const newPost = useSelector((state) => state.post.newPost);
  const user = useSelector((state) => state.user.user);

  // const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    getNotifications(dispatch);
  }, [dispatch]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
      socket.emit("join-rooms", user.subscribedPosts);
    });

    socket.on("update-notifications", () => {
      getNotifications(dispatch);
    });

    socket.on("debug", (msg) => {
      console.log("debugSocket", msg);
    });

    return () => {
      // socket.emit('disconnect')
      // socket.disconnect();
    };
  }, [dispatch, socket, user.subscribedPosts]);

  // const toggleDrawer = (open) => {
  //   setDrawerOpen(open);
  // };

  return (
    <>
    {/* <div className={classes.root}> */}
      {/* <NavBar onClickMenu={toggleDrawer} /> */}
      {/* <Drawer
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
      </Drawer> */}
      <Container className={classes.content}>
        <CreatePost />
        <Posts />
      </Container>
      {newPost && <NewPostBar />}
    {/* </div> */}
    </>
  );
};

export default Home;
