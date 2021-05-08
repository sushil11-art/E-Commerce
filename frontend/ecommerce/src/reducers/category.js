import { CATEGORIES } from "../actions/types";

const initialState = {
  categories: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES:
      return { ...state, ...payload, loading: false };

    default:
      return state;
  }
}
