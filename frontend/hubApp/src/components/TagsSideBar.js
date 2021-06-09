import React from "react";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Typography,
  Drawer,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTag } from "../store/actions/tagAction";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  tagsbar: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
  },
  tags: {
    padding: 0,
  },
  title: {
    color: "white",
    textAlign: "left",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const TagsSideBar = ({ onClickClose, openDrawer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector((state) => state.tag.tags);
  const selectedTag = useSelector((state) => state.tag.selectedTag);

  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      open={openDrawer}
      onClose={() => onClickClose()}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={() => onClickClose()}>
          <ChevronLeftIcon
            style={{
              color: "white",
            }}
          />
        </IconButton>
      </Toolbar>
      <Container className={classes.root}>
        <Typography className={classes.title}>Tags</Typography>
        <Divider />
        <Container className={classes.tagsbar}>
          <List>
            {tags.map((tag, index) => {
              return (
                <ListItem
                  button
                  key={index}
                  className={classes.tags}
                  onClick={() => {
                    onClickClose();
                    dispatch(setSelectedTag(tag));
                    navigate("/app");
                  }}
                >
                  <ListItemIcon style={{ minWidth: "25px" }}>
                    <LocalOfferIcon
                      style={{
                        fontSize: "20px",
                        color: "gray",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        style={{
                          fontSize: "20px",
                          color: tag === selectedTag ? "white" : "gray",
                        }}
                      >
                        {tag}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Container>
      </Container>
    </Drawer>
  );
};

export default TagsSideBar;
