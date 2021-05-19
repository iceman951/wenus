import { Axios } from "../../components/HttpClient";

export const Login = (dispatch, values) => {
  Axios.post(`/users/login`, values).then((res) => {
    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", res.data.user);
    dispatch({ type: "LOGIN", res });
  });
  // .catch((err) => {
  //   if (err.response.status === 404) {
  //     actions.setFieldError("email", "บัญชีนี้ไม่ได้รับการลงเทียน");
  //   } else if (err.response.status === 401) {
  //     actions.setFieldError("password", "รหัสผ่านไม่ถูกต้อง");
  //   }

  //   console.error(err.response);
  // });
};

export const Logout = (dispatch, values) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};
