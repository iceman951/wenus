import React, { useState, useEffect } from "react";

import { Axios } from "../components/HttpClient";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Button,
  Avatar,
  Typography,
  IconButton,
  Box,
  Container,
} from "@material-ui/core/";
import { Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import { getAllPost, filterPost } from "../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";

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

  function ImageChecking(image) {
    if (image) {
      return (
        <CardMedia
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
      );
    }
  }

  return (
    <Container>
      {posts.map((post) => (
        <Card key={post._id}>
          <CardContent>
            <Grid container>
              <Avatar></Avatar>
              <Box minWidth={1}>
                <Typography style={{ wordWrap: "break-word" }}>
                  {post.text}
                </Typography>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
