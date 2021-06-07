import Axios from "axios";

export const getNotifications = (dispatch) => {
  Axios.get(`/notifications`).then((res) => {
    dispatch({ type: "FETCH_NOTIFICATION", res });
  });
};

export const showNotifications = (dispatch) => {
  Axios.patch(`/notifications/update`).then((res) => {
    getNotifications(dispatch);
  });
};
