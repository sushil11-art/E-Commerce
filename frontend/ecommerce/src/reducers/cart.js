import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

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
      return {
        ...state,
        products: payload.newCartItems.products,
        subTotal: payload.newCartItems.subTotal,
        user: payload.newCartItems.user,
        loading:false
      };

    case REMOVE_FROM_CART:
      return state;
    //   return { ...state, product: payload, loading: false };

    default:
      return state;
  }
}
