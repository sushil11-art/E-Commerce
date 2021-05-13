import axios from "../axios/axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";
import { setAlert } from "./alert";


export const AddToCart = (productID,history) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
  
    const body={}
    const res = await axios.post(`/cart/addProduct/${productID}`,body,
      {headers: { 'x-auth-token': token }}
    );
    // console.log(res.data.newCartItems.subTotal);
    dispatch({ type: ADD_TO_CART, payload: res.data});
    dispatch(setAlert("Product added to your cart", "success"));
    history.push('/cart')
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const FetchCartItems=()=>async(dispatch)=>{
  try{
    const token = localStorage.getItem("token");
    // const body={}
    const res = await axios.get('/cart/getCart',
      {headers: { 'x-auth-token': token }}
    );
    console.log(res)
  }
  catch(err){
    console.log(err);
  }
}