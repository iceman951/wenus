import Axios from "axios";
import { alertSuccessToast } from "../../utils/sweetAlertToast";

export const getPosts = (dispatch, tag, skip, posts_length) => {
  dispatch({ type: "isLoading" });
  Axios.get(`posts/tag/${tag}/skip/${skip}/posts_length/${posts_length}`).then(
    (res) => {
      let data = res.data.filter((post) => post.active === true);
      let postsLength = res.postsLength;
      if (!(data.length === 0)) {
        dispatch({ type: "FETCH_POST_BY_TAG", data, postsLength });
      } else {
        dispatch({ type: "NEXT_PAGE_POST", postsLength });
      }
      // console.log(posts)
    }
  );
};

export const getMyPost = (dispatch, skip) => {
  dispatch({ type: "isLoading" });
  Axios.get(`posts/me/skip/${skip}`).then((res) => {
    let data = res.data.filter((post) => post.active === true);
    let postsLength = res.postsLength;
    if (!(data.length === 0)) {
      dispatch({ type: "FETCH_POST_BY_TAG", data, postsLength });
    } else {
      dispatch({ type: "NEXT_PAGE_POST", postsLength });
    }
    // console.log(res);
    // console.log(posts)
  });
};

export const createPost = (dispatch, values, selectedTag) => {
  Axios.post(`/posts`, values).then((res) => {
    alertSuccessToast(res.message);
    if (selectedTag === values.tag) {
      dispatch({ type: "RESET_POST" });
      getPosts(dispatch, selectedTag, 0, 0);
    } else {
      dispatch({
        type: "SET_SELECTED_TAG",
        payload: { selectedTag: values.tag },
      });
    }
    // console.log(res)
    // console.log(res.data.message)
  });
};

export const getPostById = (dispatch, id) => {
  Axios.get(`posts/id/${id}`).then((res) => {
    // console.log(res);
    dispatch({ type: "UPDATE_POST", post: res.data });
  });
};

export const deletePost = (dispatch, post) => {
  const value = { data: { post_id: post._id } };
  Axios.delete(`/posts`, value).then((res) => {
    // console.log("res", res.data);
    dispatch({ type: "DELETE_POST", post });
    alertSuccessToast(res.message);
  });
};

export const editPost = (dispatch, values) => {
  Axios.patch(`/posts`, values)
    .then((res) => {
      // console.log("res", res);
      getPostById(dispatch, values.post_id);
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
      getPostById(dispatch, values.post_id);
      alertSuccessToast(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
  // console.log(values);
};
