import React, { useEffect, useContext } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import NewPostBar from "./NewPostBar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import { getNotifications } from "../../store/actions/notificationAction";
import { getPostById } from "../../store/actions/postAction";

const useStyles = makeStyles((theme) => ({
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

  useEffect(() => {
    getNotifications(dispatch);
  }, [dispatch]);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join-rooms", user.subscribedPosts);
    });

    socket.on("update-notifications", () => {
      getNotifications(dispatch);
    });

    socket.on("new-comment", (post_id) => {
      getPostById(dispatch, post_id, true);
    });

    socket.on("new-like", (post_id) => {
      getPostById(dispatch, post_id, true);
    });
    // ========= Socket Debug ==============
    // socket.on("debug", (msg) => {
    //   console.log("debugSocket", msg);
    // });
    // =====================================

    return () => {
      // socket.disconnect();
    };
  }, [dispatch, socket, user.subscribedPosts]);

  return (
    <>
      <Container className={classes.content}>
        <CreatePost />
        <Posts />
      </Container>
      {newPost && <NewPostBar />}
    </>
  );
};

export default Home;
