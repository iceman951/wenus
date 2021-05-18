import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Box,
  Container,
} from "@material-ui/core/";
import { Grid } from "@material-ui/core";
import { getAllPost, filterPost, deletePost } from "../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Posts() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.allPosts);
  const posts = useSelector((state) => state.post.posts);
  const selectedTag = useSelector((state) => state.tag.selectedTag);

  useEffect(() => {
    getAllPost(dispatch);
  }, []);

  useEffect(() => {
    // dispatch({ type: "isLoading" });
    filterPost(dispatch, selectedTag);
  }, [allPosts, selectedTag]);

  const handleDeletePost = (post_id) => {
    deletePost(dispatch, post_id);
  };

  return (
    <Container>
      {posts.map((post) => (
        <Card key={post._id} style={{ marginBottom: "1%" }}>
          <CardContent>
            <Grid container justify="center" alignItems="flex-start">
              <Grid item xs={2}>
                <Avatar></Avatar>
              </Grid>
              <Grid item xs={8}>
                <Box minWidth={1}>
                  <Typography style={{ wordWrap: "break-word" }}>
                    {post.text}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  size="small"
                  onClick={() => handleDeletePost(post._id)}
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
