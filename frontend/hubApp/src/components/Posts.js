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
