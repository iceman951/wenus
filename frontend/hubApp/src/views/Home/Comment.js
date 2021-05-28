import React from "react";
// Mui
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from "@material-ui/core/";
// Redux
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const current_user = useSelector((state) => state.user.user);
  const isAuthor = current_user._id === comment.author._id;
  const text = {
    component: "span",
    variant: "body2",
    style: { wordWrap: "break-word", textAlign: "left", marginLeft: 20 },
  };

  return (
    <ListItem alignItems="flex-start" style={{ marginBottom: 5 }}>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: isAuthor && "red" }} />
      </ListItemAvatar>
      <ListItemText
        primary={`${comment.author.firstName} ${comment.author.lastName}`}
        primaryTypographyProps={{ variant: "body2", style: { marginLeft: 20 } }}
        secondary={comment.text}
        secondaryTypographyProps={text}
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: 20,
          padding: 5,
        }}
      />
    </ListItem>
  );
};

export default Comment;
