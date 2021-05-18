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
import { getAllPost, deletePost } from "../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    getAllPost(dispatch);
  }, []);

  const handleDeletePost = (post_id) => {
    deletePost(dispatch, post_id);
  };

  return (
    <Container>
      {posts.map((post) => (
        <Card key={post._id} style={{ marginBottom: "1%" }}>
          <CardContent>
            <Grid container justify="space-between">
              <Grid item xs={2}>
                <Grid container justify="center">
                  <Avatar></Avatar>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Box minWidth={1}>
                  <Typography style={{ wordWrap: "break-word" }}>
                    {post.text}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="center">
                  <IconButton
                    id={`iconButton-${post._id}`}
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
