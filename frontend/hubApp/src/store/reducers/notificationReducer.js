const initialState = {
  notification: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NOTIFICATION":
      return {
        notification: action.res.notification,
      };
    default:
      return state;
  }
};
export default notificationReducer;
