import React from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../store/actions/postAction";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@material-ui/core/";
const validationPostSchema = yup.object({
  text: yup.string("").required(""),
});
export default function CommentForm({ post_id }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      text: "",
      post_id: post_id,
    },
    validationSchema: validationPostSchema,
    onSubmit: (values, actions) => {
      console.log("onsubmit");
      createComment(dispatch, values);
      actions.resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} style={{ marginBottom: 10 }}>
      <TextField
        id={`comment-${post_id}`}
        placeholder="แสดงความคิดเห็น......"
        size="small"
        rows={6}
        fullWidth
        value={formik.values.text}
        onChange={formik.handleChange("text")}
        error={formik.touched.text && Boolean(formik.errors.text)}
        helperText={formik.touched.text && formik.errors.text}
      />
    </form>
  );
}
