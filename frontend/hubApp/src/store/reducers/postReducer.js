const initState = {
  // allPosts: [],
  posts: [],
  loading: true,
  dbPostsLength: 0,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_POST_BY_TAG":
      var data = action.res.data;
      // console.log(data);
      // console.log(action.res.data.data)
      if (action.skip === 0) {
        return {
          ...state,
          posts: [...state.posts, ...data],
          loading: false,
          dbPostsLength: action.res.postsLength,
        };
      }
      return {
        ...state,
        posts: [...state.posts, ...data],
        loading: false,
      };
    case "RESET_POST":
      return {
        ...state,
        posts: [],
      };
    case "UPDATE_POST":
      // console.log(action.res.data.product_name)
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.post._id ? action.post : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => action.post._id !== post._id),
        dbPostsLength: state.dbPostsLength - 1,
      };
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
