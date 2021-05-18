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
        getAllPost(dispatch)
    })
    .catch((err) => {
      console.log(err);
    });
};
