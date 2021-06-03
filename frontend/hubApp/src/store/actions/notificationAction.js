import Axios from "axios";

export const getNotifications = (dispatch) => {
  Axios.post(`/notification`, values).then((res) => {
    dispatch({ type: "FETCH_NOTIFICATION", res });
  });
};
