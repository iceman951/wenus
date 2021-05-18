import { Axios } from "../../components/HttpClient";
import { alertSuccessToast, alertErrorToast } from '../../utils/sweetAlertToast'
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
      // console.log(res)
      // console.log(res.data.message)
      if (res.data.success){
        alertSuccessToast(res.data.message)
        // fetch new post
        getAllPost(dispatch)
      }
      else{
        alertErrorToast(res.data.message)
      }
        
    })
    .catch((err) => {
      // console.log(err);
    });
};
