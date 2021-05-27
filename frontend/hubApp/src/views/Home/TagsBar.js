import React, { useEffect } from "react";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTag } from "../../store/actions/tagAction";

const useStyles = makeStyles((theme) => ({
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
  root: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "white",
    textAlign: "left",
  },
}));

const TagsBar = ({onClick}) => {
  const classes = useStyles();

  //redux
  const tags = useSelector((state) => state.tag.tags);
  const selectedTag = useSelector((state) => state.tag.selectedTag);
  const isLoading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(selectedTag);
  }, [selectedTag]);

  return (
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
                  onClick(false);
                  dispatch(setSelectedTag(tag));
                }}
              >
                <ListItemIcon style={{minWidth: '25px'}}>
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
  );
};

export default TagsBar;
