import { Chip, Container, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTag } from "../../store/actions/tagAction";

const useStyles = makeStyles((theme) => ({
  tagsbar: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  tags: {
    margin: theme.spacing(0.5),
  },
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
}));

const TagsBar = () => {
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
    <Container>
      <Paper className={classes.root}>
        <Container className={classes.tagsbar}>
          <Chip
            className={classes.tags}
            label="โพสต์ของฉัน"
            color="primary"
            variant={"โพสต์ของฉัน" === selectedTag ? "default" : "outlined"}
            disabled={isLoading ? true : false}
            onClick={(e) => {
              //update state (Redux)
              dispatch(setSelectedTag(e.target.innerText));
            }}
          />
          {tags.map((tag, index) => {
            return (
              <Chip
                key={index}
                className={classes.tags}
                label={tag}
                color="primary"
                variant={tag === selectedTag ? "default" : "outlined"}
                disabled={isLoading ? true : false}
                onClick={(e) => {
                  //update state (Redux)
                  dispatch(setSelectedTag(e.target.innerText));
                }}
              />
            );
          })}
          {/* End Space (lastItem)*/}
        </Container>
      </Paper>
    </Container>
  );
};

export default TagsBar;
