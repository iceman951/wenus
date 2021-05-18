const initState = {
  allPosts: [],
  posts: [],
  loading: true,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ALL_POST":
      var data = action.res.data.data;
      // console.log(data)
      // console.log(action.res.data.data)
      return {
        ...state,
        allPosts: data,
        loading: false,
      };

    case "FILTER_POST_BY_TAG":
      // console.log(action.selectedTag)
      let filteredPosts = state.allPosts.filter(post => post.tag === action.selectedTag);
      // console.log(data);

      return {
        ...state,
        posts: filteredPosts,
        // loading: false,
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
