import axios from "../axios/axios";
import {PLACE_ORDER,PLACE_ORDER_FAIL,CANCEL_ORDER,GET_ORDERS} from "./types";
import { setAlert } from "./alert";

export const placeOrder = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    // const body = {};
    const res = await axios.post('/order/placeOrder', formData, {
      headers: { "x-auth-token": token },
    });
    console.log(res.data);
    // console.log(res.data.newCartItems.subTotal);
    dispatch({ type: PLACE_ORDER, payload: res.data });
    dispatch(setAlert("You have successfully order the items", "success"));
    // history.push("/cart");
    // console.log(res.data);
  } catch (err) {
    // console.log(err);
     const errors = err.response.data.errors;
    // console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: PLACE_ORDER_FAIL });
  }
  }

   
export const getMyOrders=()=>async(dispatch)=>{
  try{
     const token = localStorage.getItem("token");
    // const body={}
    const res = await axios.get("/order/getMyOrders", {
      headers: { "x-auth-token": token },
    });
    // console.log(res.data);
    dispatch({ type: GET_ORDERS, payload: res.data });

  }
  catch(err){
    console.log(err);
  }
}
