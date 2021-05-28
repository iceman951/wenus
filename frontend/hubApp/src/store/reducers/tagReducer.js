import { SET_TAGS, SET_SELECTED_TAG } from "../actions/tagAction";

const initState = {
  tags: [
    "ฉัน",
    "ทั่วไป",
    "ความรัก",
    "การศึกษา",
    "ไอดอล",
    "ปรึกษา",
    "เกม-กีฬา",
    "สุขภาพ",
    "สังคม",
    "นิยาย",
    "บิวตี้",
    "หนัง-ซีรีย์",
    "อาหาร",
  ],
  // tags: [
  //   {
  //     icon: "",
  //     text: "ฉัน",
  //     value: "me",
  //   },
  //   {
  //     icon: "",
  //     text: "ทั่วไป",
  //     value: "general",
  //   },
  //   {
  //     icon: "",
  //     text: "ความรัก",
  //     value: "love",
  //   },
  //   {
  //     icon: "",
  //     text: "การศึกษา",
  //     value: "education",
  //   },
  //   {
  //     icon: "",
  //     text: "ไอดอล",
  //     value: "idol",
  //   },
  //   {
  //     icon: "",
  //     text: "ปรึกษา",
  //     value: "consult",
  //   },
  //   {
  //     icon: "",
  //     text: "เกม/กีฬา",
  //     value: "game",
  //   },
  //   {
  //     icon: "",
  //     text: "สุขภาพ",
  //     value: "healthy",
  //   },
  //   {
  //     icon: "",
  //     text: "สังคม",
  //     value: "social",
  //   },
  //   {
  //     icon: "",
  //     text: "นิยาย",
  //     value: "Fiction",
  //   },
  //   {
  //     icon: "",
  //     text: "บิวตี้",
  //     value: "Beauty",
  //   },
  //   {
  //     icon: "",
  //     text: "หนัง/ซีรีส์",
  //     value: "movies",
  //   },
  //   {
  //     icon: "",
  //     text: "อาหาร",
  //     value: "food",
  //   },
  // ],
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
