import React, { useEffect } from "react";
import Post from "./Post";
import { Container } from "@material-ui/core/";
import { getAllPost, filterPost } from "../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";

export default function Posts() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.allPosts);
  const posts = useSelector((state) => state.post.posts);
  const selectedTag = useSelector((state) => state.tag.selectedTag);

  useEffect(() => {
    // console.log('effect1')
    getAllPost(dispatch);
  }, [dispatch]);

  useEffect(() => {
    // console.log('effect2')
    filterPost(dispatch, selectedTag);
  }, [dispatch, allPosts, selectedTag]);

  return (
    <Container>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Container>
  );
}
