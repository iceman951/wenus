import { Chip, Container, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setSelectTag } from "../../store/actions/tagAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    overflowX: "scroll",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    // Scrollbar Hidden
    msOverflowStyle: "none",
    overflow: "-moz-scrollbars-none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  tags: {
    margin: theme.spacing(0.5),
  },
  tagsbar: {
    marginTop: theme.spacing(2),
  },
}));

const TagsBar = () => {
  const classes = useStyles();

  //redux
  const tags = useSelector((state) => state.tag.tags)
  const selectedTag = useSelector((state) => state.tag.selectedTag);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(selectedTag);
  }, [selectedTag]);

  return (
    <Container className={classes.tagsbar}>
      <Paper className={classes.paper}>
        {tags.map((tag, index) => {
          return (
            <Chip
              key={index}
              className={classes.tags}
              label={tag}
              color="primary"
              variant={tag === selectedTag ? "default" : "outlined"}
              onClick={(e) => {
                //update state (Redux)
                dispatch(setSelectTag(e.target.innerText));
              }}
            />
          );
        })}
        {/* End Space (lastItem)*/}
        <span
          style={{
            minWidth: "10px",
          }}
        ></span>
      </Paper>
    </Container>
  );
};

export default TagsBar;
