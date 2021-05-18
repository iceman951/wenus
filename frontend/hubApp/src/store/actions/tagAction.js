export const SET_TAGS = "SET_TAGS";
export const SET_SELECTTEG = "SET_SELECTTAG";

export const setTags = (tags) => {
  return {
    type: SET_TAGS,
    payload: {
      tags: tags,
    },
  };
};

export const setSelectTag = (tag) => {
  return {
    type: SET_SELECTTEG,
    payload: {
      selectedTag: tag,
    },
  };
};
