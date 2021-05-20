import React, { useState } from "react";
// Mui
import {
  Avatar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Divider,
  Button,
  makeStyles,
  Grid,
  Paper,
  Container,
  CardContent,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from "@material-ui/core/";
// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
// Redux
import { useDispatch, useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();

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
