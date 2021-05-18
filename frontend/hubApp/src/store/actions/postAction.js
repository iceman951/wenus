import { Axios } from "../../components/HttpClient";

export const getAllPost = (dispatch) => {
  Axios.get("/posts/").then((res) => {
    if (res.status === 200) {
      dispatch({ type: "FETCH_ALL_POST", res });
      // console.log(res.data.data)
      // console.log(posts)
    }
  });
};
export const createPost = (dispatch, values) => {
  Axios.post(`/posts`, values)
    .then((res) => {
      getAllPost(dispatch);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deletePost = (dispatch, id) => {
  const value = { data: { post_id: id } };
  Axios.delete(`/posts`, value)
    .then((res) => {
      // console.log("res", res.data);
      getAllPost(dispatch);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
