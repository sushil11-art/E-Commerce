import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
} from "../actions/types";

const initialState = {
  category: {},
  loading: true,
  categories: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CATEGORY:
    case GET_CATEGORY:
    case EDIT_CATEGORY:
      return { ...state, category: payload.category, loading: false };
    case DELETE_CATEGORY:
      return {...state,category:{},loading:false}
    case GET_CATEGORIES:
      return { ...state, categories: payload.categories, loading: false };
    default:
      return state;
  }
}
