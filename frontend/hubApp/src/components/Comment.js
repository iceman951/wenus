import React from "react";
// Mui
import {
  Avatar,
  Typography,
  Divider,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from "@material-ui/core/";
// Redux

const Comment = ({ comment }) => {

  return (
    <>
      <ListItem alignItems="flex-start" style={{ marginBottom: 5}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              style={{ wordWrap: "break-word", textAlign: "left" }}
            >
              {comment.text}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Comment;
