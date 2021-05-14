import { GET_ORDERS, PLACE_ORDER,PLACE_ORDER_FAIL } from "../actions/types";

const initialState = {
    orders:{},
    loading:false
};


export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(payload);
  // const {subTotal}=payload
  // console.log(subTotal);
  switch (type) {
    case PLACE_ORDER:
        return state
    case PLACE_ORDER_FAIL:
        return state
    case GET_ORDERS:
        return {...state,orders:payload.orders,loading:false}
    default:
      return state;
  }
}