import { PRODUCTS, PRODUCT, PRODUCT_FAIL } from "../actions/types";

const initialState = {
  products: [],
  product: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS:
      return { ...state, ...payload, loading: false };

    case PRODUCT:
      return { ...state, product: payload, loading: false };
    case PRODUCT_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
