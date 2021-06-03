const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NOTIFICATION":
      return {
        notifications: action.res.notifications,
      };
    default:
      return state;
  }
};
export default notificationReducer;
