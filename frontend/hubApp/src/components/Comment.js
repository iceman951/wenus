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
    <Container>{comment.text}</Container>
    </>
  );
};

export default Comment;
