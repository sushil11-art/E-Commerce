import { ADD_PRODUCT, GET_ADMIN_PRODUCTS } from "../actions/types";


const initialState = {
  product: {},
  loading: true,
  products: [],
};


export default function(state=initialState,action){
  const {type,payload}=action;

  switch(type){
    case GET_ADMIN_PRODUCTS:
      return {...state,products:payload.products,loading:false}
    case ADD_PRODUCT:
      return {...state,product:payload.product,loading:false}
      default:
        return state;
  }

}