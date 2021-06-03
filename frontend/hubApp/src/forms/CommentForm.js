import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { SocketContext } from "../context/socket";

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
  const socket = useContext(SocketContext);
  const user = useSelector((state) => state.user.user)

  const joinRoom = (post_id) => {
    socket.emit("join-rooms", [post_id]);
  };
  const notification = (post_id) => {
    socket.emit("sent-comment", post_id, user._id);
    // (socket);
  };
  const formik = useFormik({
    initialValues: {
      text: "",
      post_id: post_id,
    },
    validationSchema: validationPostSchema,
    onSubmit: (values, actions) => {
      createComment(dispatch, joinRoom, notification, values);
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
            multiline
            fullWidth
            value={formik.values.text}
            onChange={formik.handleChange("text")}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formik.handleSubmit();
                e.preventDefault();
              }
              if (e.shiftKey && e.key === "Enter") {
                formik.setFieldValue("text", `${formik.values.text}\n`);
                e.preventDefault();
              }
            }}
          />
        </Paper>
      </form>
    </Container>
  );
}
