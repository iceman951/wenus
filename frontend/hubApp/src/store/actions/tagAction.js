export const SET_TAGS = "SET_TAGS";
export const SET_SELECTED_TAG = "SET_SELECTED_TAG";

export const setTags = (tags) => {
  return {
    type: SET_TAGS,
    payload: {
      tags: tags,
    },
  };
};

export const setSelectedTag = (tag) => {
  return {
    type: SET_SELECTED_TAG,
    payload: {
      selectedTag: tag,
    },
  };
};
