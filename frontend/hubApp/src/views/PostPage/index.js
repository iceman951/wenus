import { Container, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import NavBar from "../../components/NavBar";
import { getPostById } from "../../store/actions/postAction";
import Post from "../Home/Post";

const PostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const posts = useSelector((state) => state.post.posts);
  const post = posts[0];

  useEffect(() => {
    dispatch({ type: "isLoading" });
    dispatch({ type: "RESET_POST" });
    getPostById(dispatch, id, false);
  }, [dispatch, id]);

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
    >
      <NavBar />
      <Container>
        <Toolbar style={{ marginBottom: 16 }} />
        {post && <Post post={post} isSingle={true} />}
      </Container>
    </div>
  );
};

export default PostPage;
