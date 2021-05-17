import { Chip, Container, makeStyles, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";

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
  const [tags, setTags] = useState([
    "ทั่วไป",
    "ความรัก",
    "การศึกษา",
    "ไอดอล",
    "ปรึกษา",
    "เกม/กีฬา",
    "สุขภาพ",
    "สังคม",
    "นิยาย",
    "บิ้วตี้",
    "หนัง/ซีรีย์",
    "อาหาร",
  ]);
  const [selectTag, setSelectTag] = useState("ทั่วไป");

  //   useEffect(() => {
  //       console.log(selectTag);
  //   }, [selectTag])
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
              variant={tag === selectTag ? "default" : "outlined"}
              onClick={(e) => {
                setSelectTag(e.target.innerText);
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
