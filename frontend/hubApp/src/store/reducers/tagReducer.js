import { SET_TAGS, SET_SELECTED_TAG } from "../actions/tagAction";

const initState = {
  tags: [
    "ทั่วไป",
    "ความรัก",
    "การศึกษา",
    "ไอดอล",
    "ปรึกษา",
    "เกม-กีฬา",
    "สุขภาพ",
    "สังคม",
    "นิยาย",
    "บิ้วตี้",
    "หนัง-ซีรีย์",
    "อาหาร",
  ],
  selectedTag: "ทั่วไป",
};

const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload.tags,
      };
    case SET_SELECTED_TAG:
      return {
        ...state,
        selectedTag: action.payload.selectedTag,
      };
    default:
      return state;
  }
};

export default tagReducer;
