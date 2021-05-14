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
} from "@material-ui/core/";
import { Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get("/posts/").then((res) => {
      // console.log(res)
      if (res.status === 200) {
        // console.log(res.data.data)
        setPosts(res.data.data);
        // console.log(posts)
      }
    });
  }, []);

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
    <Grid container style={{ padding: "5%" }}>
      {posts.map((post) => (
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Card key={post._id} >
                <Box>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" >
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                </Box>
                <CardContent>
                  <Typography>
                    <Box>{post.text}</Box>
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
