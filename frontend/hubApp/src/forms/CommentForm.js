import React from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../store/actions/postAction";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Container,
  Paper,
  TextField,
  makeStyles,
  Avatar,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "25px",
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0, 2, 0),
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
  },
}));

const validationPostSchema = yup.object({
  text: yup.string("").required(""),
});

export default function CommentForm({ post_id }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      text: "",
      post_id: post_id,
    },
    validationSchema: validationPostSchema,
    onSubmit: (values, actions) => {
      // console.log("onsubmit");
      createComment(dispatch, values);
      actions.resetForm();
    },
  });
  return (
    <Container className={classes.root}>
      <Avatar style={{ backgroundColor: "red" }}></Avatar>
      <form
        onSubmit={formik.handleSubmit}
        style={{ marginBottom: 10, width: "100%" }}
      >
        <Paper className={classes.paper} elevation={0}>
          <TextField
            id={`comment-${post_id}`}
            InputProps={{ className: classes.input }}
            placeholder="แสดงความคิดเห็น......"
            size="small"
            rows={6}
            fullWidth
            value={formik.values.text}
            onChange={formik.handleChange("text")}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
          />
        </Paper>
      </form>
    </Container>
  );
}
