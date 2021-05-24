const initState = {
  // allPosts: [],
  posts: [],
  loading: true,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_POST_BY_TAG":
      var data = action.res.data;
      // console.log(data);
      // console.log(action.res.data.data)
      return {
        ...state,
        posts: [...state.posts, ...data],
        loading: false,
      };
    case 'RESET_POST':
      return {
        ...state,
        posts: [],
      }
    case "isLoading":
      return {
        ...state,
        loading: true,
      };
    case "NOT_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default postReducer;
