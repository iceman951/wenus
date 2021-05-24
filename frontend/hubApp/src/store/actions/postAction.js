import Axios from "axios";
import {
  alertSuccessToast,
  alertErrorToast,
} from "../../utils/sweetAlertToast";

export const getPosts = (dispatch, tag, skip, posts_length) => {
  dispatch({ type: "isLoading" });
  Axios.get(`posts/tag/${tag}/skip/${skip}/posts_length/${posts_length}`).then((res) => {
    dispatch({ type: "FETCH_POST_BY_TAG", res, skip});
    // console.log(res)
    // console.log(posts)
  });
};

export const createPost = (dispatch, values, selectedTag) => {
  Axios.post(`/posts`, values)
    .then((res) => {
      alertSuccessToast(res.message);
      if (selectedTag === values.tag) {
        dispatch({ type: "RESET_POST" });
        getPosts(dispatch, selectedTag, 0, 0);
      } else {
        dispatch({ type: "SET_SELECTED_TAG", payload: { selectedTag: values.tag} });
      }
      // console.log(res)
      // console.log(res.data.message)
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
      // console.log("res", res.data);
      getPosts(dispatch);
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
