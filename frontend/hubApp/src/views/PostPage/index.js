import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
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
    <Container
      style={{
        paddingTop: 20,
      }}
    >
      {post ? <Post post={post} isSingle={true} /> : <></>}
    </Container>
  );
};

export default PostPage;
