import axios from "../axios/axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const AddToCart = (productID) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
  
    const body={}
    const res = await axios.post(`/cart/addProduct/${productID}`,body,
      {headers: { 'x-auth-token': token }}
    );
    // console.log(res.data.newCartItems.subTotal);
    dispatch({ type: ADD_TO_CART, payload: res.data});
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
