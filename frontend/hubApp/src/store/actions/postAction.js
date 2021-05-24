import Axios from "axios";
import {
  alertSuccessToast,
  alertErrorToast,
} from "../../utils/sweetAlertToast";

export const getPosts = (dispatch, tag, skip) => {
  console.log("skip: ", skip, ", tag: ", tag);
  Axios.get(`posts/tag/${tag}/skip/${skip}`).then((res) => {
    dispatch({ type: "FETCH_POST_BY_TAG", res });
    console.log(res);
    // console.log(posts)
  });
};

export const getMyPost = (dispatch, skip) => {
  Axios.get(`posts/me/skip/${skip}`).then((res) => {
    dispatch({ type: "FETCH_POST_BY_TAG", res });
    console.log(res);
    // console.log(posts)
  });
};

export const createPost = (dispatch, values) => {
  Axios.post(`/posts`, values)
    .then((res) => {
      // console.log(res)
      // fetch new post
      getPosts(dispatch);
      alertSuccessToast(res.message);
    })
    .catch((err) => {
      alertErrorToast(err);
      dispatch({ type: "NOT_LOADING" });
    });
};

export const deletePost = (dispatch, id) => {
  const value = { data: { post_id: id } };
  Axios.delete(`/posts`, value).then((res) => {
    // console.log("res", res.data);
    getPosts(dispatch);
    alertSuccessToast(res.message);
  });
};

export const editPost = (dispatch, values) => {
  Axios.patch(`/posts`, values)
    .then((res) => {
      // console.log("res", res);
      dispatch({ type: "UPDATE_POST", id: values.post_id, text: values.text })
      alertSuccessToast(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
  // console.log(values);
};

export const likePost = (id) => {
  const values = { post_id: id };
  Axios.patch(`/posts/like`, values);
};
export const createComment = (dispatch, values) => {
  Axios.post(`/comments`, values)
    .then((res) => {
      // console.log("res", res.data);
      getPosts(dispatch);
      alertSuccessToast(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
  // console.log(values);
};
