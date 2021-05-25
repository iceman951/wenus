import React from "react";
import {
  Button,
  Divider,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@material-ui/core/";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50vw",
    backgroundColor: theme.palette.primary.dark,
    borderRadius: "10px 10px 10px 10px",
    padding: theme.spacing(2, 3, 2),
  },
  typography: {
    color: "#fff",
  },
  input: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
    color: "white",
  },
}));

const PostForm = ({ actions, formik }) => {
  const classes = useStyles();
  const tags = useSelector((state) => state.tag.tags);
  const selectedTag = useSelector((state) => state.tag.selectedTag)

  return (
    <div className={classes.paper}>
      <Typography align="center" variant="h6" className={classes.typography}>
        {actions === "create" ? "สร้างโพสต์" : "แก้ไขโพสต์"}
      </Typography>
      <Divider
        style={{
          marginBottom: "3%",
          marginTop: "3%",
        }}
      />
      <form onSubmit={formik.handleSubmit}>
        {actions === "create" && (
          <FormControl>
            <InputLabel htmlFor="tag">Tags</InputLabel>
            <Select
              id="tag"
              value={formik.values.tag}
              onChange={formik.handleChange("tag")}
              autoWidth
              className={classes.input}
            >
              {tags.map((tag, index) => (
                <MenuItem
                  key={index}
                  value={tag}
                  style={{
                    fontSize: "16px",
                  }}
                >
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField
          id={actions}
          placeholder={
            actions === "create"
              ? "คุณอยากโพสต์อะไร?"
              : "กรุณาพิมพ์ข้อความเพื่อแก้ไขโพสต์"
          }
          multiline
          rows={6}
          fullWidth
          InputProps={{ className: classes.input }}
          value={formik.values.text}
          onChange={formik.handleChange("text")}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formik.values.text}
        >
          {actions === "create" ? "โพสต์" : "แก้ไข"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
