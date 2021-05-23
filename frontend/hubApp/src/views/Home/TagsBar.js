import { Chip, Container, Divider, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTag } from "../../store/actions/tagAction";

const useStyles = makeStyles((theme) => ({
  tagsbar: {
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
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(selectedTag);
  }, [selectedTag]);

  return (
    <Container>
      <Paper className={classes.root}>
        <div style={{ padding: "4px" }}>
          <Chip
            className={classes.tags}
            label="โพสต์ของฉัน"
            color="secondary"
            variant={"โพสต์ของฉัน" === selectedTag ? "default" : "outlined"}
            onClick={(e) => {
              //update state (Redux)
              dispatch(setSelectedTag(e.target.innerText));
            }}
          />
        </div>
        <Divider orientation="vertical" flexItem/>
        <Container className={classes.tagsbar}>
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
                  dispatch(setSelectedTag(e.target.innerText));
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
        </Container>
      </Paper>
    </Container>
  );
};

export default TagsBar;
