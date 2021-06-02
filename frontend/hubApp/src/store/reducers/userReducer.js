let user = JSON.parse(localStorage.getItem("user"));
let token = localStorage.getItem("token");

const initialState = user
  ? { user: user, token: token, loggedIn: true, notification: [] }
  : { user: null, token: null, loggedIn: false, notification: [] };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.res.user,
        token: action.res.access_token,
        loggedIn: true,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        loggedIn: false,
      };
    case "NOTIFICATION":
      return {
        ...state,
        notification: state.notification.push(action.notification)
      }
    case "TOKEN_TIMEOUT":
      return{
        loggedIn: false
      }
    default:
      return state;
  }
};
export default userReducer;
