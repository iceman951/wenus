let user = localStorage.getItem("user");
let token = localStorage.getItem("token");

const initialState = user
  ? { user: user, token: token, loggedIn: true }
  : { user: null, token: null, loggedIn: false };

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
    case "TOKEN_TIMEOUT":
      return{
        loggedIn: false
      }
    default:
      return state;
  }
};
export default userReducer;
