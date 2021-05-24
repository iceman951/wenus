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
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const current_user = useSelector((state) => state.user.user);
  const isAuthor = current_user._id === comment.author._id;

  return (
    <>
      <ListItem alignItems="flex-start" style={{ marginBottom: 5 }}>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: isAuthor && "red" }} />
        </ListItemAvatar>
        <ListItemText
          primary={`${comment.author.firstName} ${comment.author.lastName}`}
          secondary={
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
