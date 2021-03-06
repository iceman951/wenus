import Axios from "axios";
import join from "url-join";
import configData from '../config.json'

const Interceptor = (store) => {
  function ErrorHandler() {
    localStorage.clear();
    store.dispatch({type: 'TOKEN_TIMEOUT'});
    // window.location.reload(false);
  }
  Axios.interceptors.request.use(async (config) => {
    const jwtToken = await localStorage.getItem("token");
    if (jwtToken != null) {
      config.headers = { Authorization: `Bearer ${jwtToken}` };
    }
    config.url = join(configData.SERVER_URL, config.url);
    return config;
  });

  Axios.interceptors.response.use(
    (response) => {
      if (response?.data?.success) {
        return response.data;
      }
      return response;
    },
    (error) => {
      console.log(error?.response);
      if (error?.response?.status === 401) {
        ErrorHandler();
      }
      throw error;
    }
  );
};

export default Interceptor;
