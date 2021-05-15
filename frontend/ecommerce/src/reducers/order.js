import { GET_ORDERS,GET_ORDER, PLACE_ORDER,PLACE_ORDER_FAIL, PLACE_ORDER_BY_ID,CANCEL_ORDER } from "../actions/types";

const initialState = {
    orders:{},
    loading:false,
    order:{}
};


export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PLACE_ORDER:
        return {...state,order:payload.newOrder,loading:false}
    case PLACE_ORDER_FAIL:
        return state
    case GET_ORDERS:
        return {...state,orders:payload.orders,loading:false}
    case GET_ORDER:
    case CANCEL_ORDER:
        return {...state,order:payload.order,loading:false}
    case PLACE_ORDER_BY_ID:
        return {...state,order:payload.order,loading:false}
    default:
      return state;
  }
}