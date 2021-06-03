import Axios from "axios";

export const getNotifications = (dispatch) => {
  Axios.get(`/notifications`).then((res) => {
    dispatch({ type: "FETCH_NOTIFICATION", res });
  });
};
