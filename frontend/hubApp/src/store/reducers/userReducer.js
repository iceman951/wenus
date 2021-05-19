let user = localStorage.getItem("user");
let token = localStorage.getItem("token");

const initialState = user
  ? { user: user, token: token, loggedIn: true }
  : { user: null, token: null, loggedIn: false };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("login")
      return {
        user: action.res.data.user,
        token: action.res.data.access_token,
        loggedIn: true,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        loggedIn: false,
      };
    default:
      return state;
  }
};
export default userReducer;
