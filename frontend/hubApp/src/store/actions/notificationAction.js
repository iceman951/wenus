import Axios from "axios";

export const getNotifications = (dispatch) => {
  Axios.get(`/notifications`).then((res) => {
    dispatch({ type: "FETCH_NOTIFICATION", res });
  });
};

export const showNotifications = (dispatch) => {
  Axios.patch(`/notifications/`).then((res) => {
    getNotifications(dispatch);
  });
};

export const readNotification = (dispatch, notification_id) => {
  console.log(notification_id);
  Axios.patch(`/notifications/read`, { notification_id: notification_id }).then(
    (res) => {
      getNotifications(dispatch);
    }
  );
};
