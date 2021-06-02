import Axios from "axios";

export const Login = (dispatch, formActions, values, joinRooms) => {
  Axios.post(`/users/login`, values)
    .then((res) => {
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));
      dispatch({ type: "LOGIN", res });
      joinRooms(res.user.subscribedPosts);
    })
    .catch((error) => {
      if (error.response.status === 404) {
        formActions.setFieldError("email", "บัญชีนี้ไม่ได้รับการลงทะเบียน");
      } else if (error.response.status === 401) {
        formActions.setFieldError("password", "รหัสผ่านไม่ถูกต้อง");
      }
    });
};

export const Logout = (dispatch, values) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};

export const Register = (dispatch, formActions, values) => {
  Axios.post(`/users/register`, values).then((res) => {
    if (res.success) {
      formActions.resetForm();
    }
  })
  .catch((error) => {
    if (error?.response?.status === 400) {
      formActions.setFieldError("email", "อีเมลนี้ได้ลงทะเบียนแล้ว");
    }
  });
};

// export const FetchNotification = (dispatch) => {
//   axios
// };
