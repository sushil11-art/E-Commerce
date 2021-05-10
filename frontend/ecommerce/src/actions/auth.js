import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
// import {history} from "history";

export const registerCustomer = ({ name, email, password }, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post(
      "http://localhost:4000/api/users/registerCustomer",
      body,
      config
    );
    console.log(res.data);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert("Customer register successfull", "success"));
    history.push("/login");
  } catch (err) {
    const errors = err.response.data.errors;
    // console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

export const loginCustomer = (email, password, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:4000/api/users/loginCustomer",
      body,
      config
    );
    // console.log(res.data);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    history.push("/products");
    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    // console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logoutCustomer = () => (dispatch) => {
  //   dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export const googleLogin = (tokenId,history) => async (dispatch) => {
  try {
    // console.log(tokenId);
    const body={tokenId};
    // const body = JSON.stringify({tokenId});
    // console.log(body);
    const res = await axios.post(
      "http://localhost:4000/api/users/googlelogin",
    body
    );
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    history.push('/products')
  } catch (err) {
    const errors = err.response.data.errors;
    // console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAIL });
  }
    
}


// export const loadCurrentUser=()=>async(dispatch)=>{
//   try{
//   const res=await axios.get("http://localhost:4000/auth/api/currentUser")
//   console.log(res);
//   }
//   catch(err){
//     console.log(err);
//   }

// }
