import axios from "axios";
import join from "url-join";

function ErrorHandler() {
  localStorage.clear();
}
axios.interceptors.request.use(async (config) => {
  const jwtToken = await localStorage.getItem("token");
  if (jwtToken != null) {
    config.headers = { Authorization: `Bearer ${jwtToken}` };
  }
  config.url = join("https://guarded-falls-57008.herokuapp.com/", config.url);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // if (error.response)
    if (error.response.status === 401) {
      ErrorHandler();
    }
    throw error;
  }
);

export const Axios = axios;
