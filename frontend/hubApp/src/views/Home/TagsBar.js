import { Chip, Container, makeStyles, Paper } from "@material-ui/core";
import React, { useState, useEffect} from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    overflowX: "scroll",
    backgroundColor: "rgba(255,255,255,0.1)",
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
  tagsbar:{
    marginTop: '1%'
  }
}));

const TagsBar = () => {
  const classes = useStyles();
  const [tags, setTags] = useState(["ทั่วไป", "ความรัก", "การศึกษา",'ไอดอล',"ปรึกษา","เกม/กีฬา","สุขภาพ","สังคม","นิยาย","บิ้วตี้","หนัง/ซีรีย์","อาหาร"]);
  const [selectTag, setSelectTag] = useState("ทั่วไป");

//   useEffect(() => {
//       console.log(selectTag);
//   }, [selectTag])
  return (
    <div>
      <Container maxWidth="sm" className={classes.tagsbar}>
        <Paper className={classes.paper}>
          {tags.map((tag, index) => {
            return (
              <Chip
                key={index}
                className={classes.tags}
                label={tag}
                color={tag === selectTag ? "primary" : "secondary"}
                onClick={(e) => {
                  setSelectTag(e.target.innerText);
                }}
              />
            );
          })}
          {/* End Space (lastItem)*/}
          <span style={{
              minWidth: '10px'
          }}>
          </span>
        </Paper>
      </Container>
    </div>
  );
};

export default TagsBar;
