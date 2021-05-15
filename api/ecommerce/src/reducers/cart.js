import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_CART_ITEMS,
} from "../actions/types";

const initialState = {
  // loading:true
  products: [],
  subTotal: 0,
  user: "",
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(payload);
  // const {subTotal}=payload
  // console.log(subTotal);
  switch (type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: payload.carts.products,
        subTotal: payload.carts.subTotal,
        user: payload.carts.user,
        loading: false,
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        products: payload.carts.products,
        subTotal: payload.carts.subTotal,
        user: payload.carts.user,
        loading:false,
      };
    default:
      return state;
  }
}
