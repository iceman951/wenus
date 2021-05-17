const initState = {
  posts: [],
  loading: true,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ALL_POST":
      var data = action.res.data.data;
      //   console.log(action.res.data.data)
      return {
        ...state,
        posts: data,
        loading: false,
      };
    case "isLoading":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default postReducer;
