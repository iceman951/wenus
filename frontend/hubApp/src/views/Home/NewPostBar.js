import React from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {
  makeStyles,
  Paper,
  Typography,
  Container,
  Toolbar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getMyPost, getPosts } from "../../store/actions/postAction";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  newPostBar: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "0px 0px 15px 15px",
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 20,
    zIndex: theme.zIndex.drawer,
  },
}));

const NewPostBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedTag = useSelector(state => state.tag.selectedTag)

  const handleClick = () => {
    dispatch({type: "RESET_POST"});
    selectedTag === "ฉัน"
      ? getMyPost(dispatch, 0)
      : getPosts(dispatch, selectedTag, 0, 0);
  };

  return (
    <Container className={classes.root}>
      <Toolbar />
      <Paper className={classes.newPostBar} onClick={() => handleClick()}>
        <Typography>มีโพสต์ใหม่</Typography>
        <ExpandLessIcon />
      </Paper>
    </Container>
  );
};

export default NewPostBar;
