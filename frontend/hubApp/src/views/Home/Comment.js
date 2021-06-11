import React from "react";
// Mui
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
  useTheme,
} from "@material-ui/core/";
// Redux
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const theme = useTheme();
  const current_user = useSelector((state) => state.user.user);
  const isAuthor = current_user._id === comment.author._id;
  const text = {
    variant: "body2",
    style: {
      whiteSpace: "pre-line",
      wordWrap: "break-word",
      textAlign: "left",
      marginLeft: 20,
      color: 'black',
      fontSize: 18,
    },
  };

  return (
    <ListItem
      alignItems="flex-start"
      style={{ marginBottom: 5, paddingTop: 0, paddingBottom: 0 }}
    >
      <ListItemAvatar>
        <Avatar
          style={{ background: isAuthor && theme.palette.background.main }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${comment.author.firstName} ${comment.author.lastName}`}
        primaryTypographyProps={text}
        secondary={comment.text}
        secondaryTypographyProps={text}
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: 20,
          padding: 5,
        }}
      />
    </ListItem>
  );
};

export default Comment;
