// import { Axios } from "../../components/HttpClient";
import Axios from 'axios';
import {
  alertSuccessToast,
  alertErrorToast,
} from "../../utils/sweetAlertToast";

export const getAllPost = (dispatch) => {
  Axios.get("/posts/").then((res) => {
    dispatch({ type: "FETCH_ALL_POST", res });
    // console.log(res.data)
    // console.log(posts)
  });
};

export const filterPost = (dispatch, selectedTag) => {
  dispatch({ type: "FILTER_POST_BY_TAG", selectedTag });
};

export const createPost = (dispatch, values) => {
  Axios.post(`/posts`, values)
    .then((res) => {
      // console.log(res)
      // console.log(res.data.message)
      // fetch new post
      getAllPost(dispatch);
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
    getAllPost(dispatch);
    alertSuccessToast(res.message);
  });
};

export const editPost = (dispatch, values) => {
  Axios.patch(`/posts`, values)
    .then((res) => {
      // console.log("res", res.data);
      getAllPost(dispatch);
      alertSuccessToast(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
  // console.log(values);
};

export const likePost = (id) => {
  const values = {post_id: id};
  Axios.patch(`/posts/like`, values).then((res)=> {

  }) 
}
export const createComment = (dispatch, values) => {
  Axios.post(`/comments`, values)
    .then((res) => {
      // console.log("res", res.data);
      getAllPost(dispatch);
      alertSuccessToast(res.message);
    })
    .catch((err) => {
      console.log(err.response);
    });
  // console.log(values);
};
