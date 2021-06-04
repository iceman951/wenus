import Axios from "axios";
import { alertSuccessToast } from "../../utils/sweetAlertToast";
import { getNotifications } from "./notificationAction";

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
  });
};

export const createPost = (dispatch, SentPost, values, selectedTag) => {
  Axios.post(`/posts`, values).then((res) => {
    dispatch({ type: "UPDATE_USER", res });
    if (selectedTag === values.tag) {
      dispatch({ type: "RESET_POST" });
      getPosts(dispatch, selectedTag, 0, 0);
    } else {
      dispatch({
        type: "SET_SELECTED_TAG",
        payload: { selectedTag: values.tag },
      });
    }
    alertSuccessToast(res.message);
    SentPost(res.post_id);
  });
};

export const getPostById = (dispatch, id, update) => {
  Axios.get(`posts/id/${id}`).then((res) => {
    update
      ? dispatch({ type: "UPDATE_POST", post: res.data })
      : dispatch({ type: "FETCH_ONE_POST", post: res.data });
  });
};

export const deletePost = (dispatch, post, deletePostSocket) => {
  const value = { data: { post_id: post._id } };
  Axios.delete(`/posts`, value).then((res) => {
    dispatch({ type: "DELETE_POST", post });
    deletePostSocket(post._id);
    getNotifications(dispatch);
    alertSuccessToast(res.message);
  });
};

export const editPost = (dispatch, values) => {
  Axios.patch(`/posts`, values)
    .then((res) => {
      getPostById(dispatch, values.post_id, true);
      alertSuccessToast(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const likePost = (post_id, sentLikeSocket) => {
  const values = { post_id: post_id };
  Axios.patch(`/posts/like`, values).then((res) => {
    sentLikeSocket(post_id);
  });
};
export const createComment = (dispatch, joinRoom, notification, values) => {
  Axios.post(`/comments`, values)
    .then((res) => {
      dispatch({ type: "UPDATE_USER", res });
      joinRoom(values.post_id);
      notification(values.post_id);
      getPostById(dispatch, values.post_id, true);
      alertSuccessToast(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
