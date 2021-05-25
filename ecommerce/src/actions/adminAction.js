import axios from "../axios/axios";
import { setAlert } from "./alert";
import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_ADMIN_PRODUCTS,
  ADD_PRODUCT
} from "./types";

export const AddCategory = (formData) => async (dispatch) => {
  // console.log(token);
  try {
    const token = localStorage.getItem("token");
    // const body = formData;
    // const res = await axios.post('/category/add-category', formData, {
    //   headers: { "x-auth-token": token },
    // });
    const res = await axios.post("/category/add-category", formData, {
      headers: {
        "x-auth-token": token,
        "Content-Type": "Application/json",
      },
    });
    // console.log(res.data);
    dispatch({ type: ADD_CATEGORY, payload: res.data });
    dispatch(setAlert("Category added successfully", "success"));
    dispatch(adminCategories());
  } catch (err) {
    const errors = err.response.data.errors;
    // console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    // console.log(err);
  }
};

export const editCategory = (formData, id) => async (dispatch) => {
  // console.log(token);
  try {
    const token = localStorage.getItem("token");
    // const body = formData;
    // const res = await axios.post('/category/add-category', formData, {
    //   headers: { "x-auth-token": token },
    // });
    const res = await axios.post(`/category/edit-category/${id}`, formData, {
      headers: {
        "x-auth-token": token,
        "Content-Type": "Application/json",
      },
    });
    // console.log(res.data);
    dispatch({ type: EDIT_CATEGORY, payload: res.data });
    dispatch(setAlert("Category edited successfully", "success"));
    dispatch(adminCategories());

  } catch (err) {
    const errors = err.response.data.errors;
    // console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    // console.log(err);
  }
};


export const deletCategory = (id) => async (dispatch) => {
  // console.log(token);
  try {
    const token = localStorage.getItem("token");
    const body = {}
    // const res = await axios.post('/category/add-category', formData, {
    //   headers: { "x-auth-token": token },
    // });
    const res = await axios.delete(`/category/delete-category/${id}`, {
      headers: {
        "x-auth-token": token,
        // "Content-Type": "Application/json",
      },
    }, body);
    // console.log(res.data);
    dispatch({ type: DELETE_CATEGORY, payload: res.data });
    dispatch(setAlert("Category deleted successfully", "success"));
    dispatch(adminCategories());
  } catch (err) {
    const errors = err.response.data.errors;
    // console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    // console.log(err);
  }
};


export const getCategory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/category/get-category/${id}`, {
      headers: { "x-auth-token": token },
    });
    // console.log(res.data);;
    dispatch({ type: GET_CATEGORY, payload: res.data })
  }
  catch (err) {
    console.log(err);
  }
}

export const adminCategories = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/category/all", {
      headers: { "x-auth-token": token },
    });
    // console.log(res.data);
    dispatch({ type: GET_CATEGORIES, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const adminProducts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/product/all-products", {
      headers: { "x-auth-token": token },
    });
    console.log(res.data);
    dispatch({ type: GET_ADMIN_PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const AddProduct = (formData, categoryID) => async (dispatch) => {
  // console.log(categoryID);
  try {
    const token = localStorage.getItem("token");
    const body = formData;
    // console.log(body);
    const res = await axios.post(`/product/add-product/${categoryID}`, body, {
      headers: {
        // "Content-Type":"multipart/form-data",
        "x-auth-token": token,
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    // console.log(res.data);
    dispatch({ type: ADD_PRODUCT, payload: res.data });
    dispatch(setAlert("Product added successfully", "success"));
    dispatch(adminProducts());
  } catch (err) {
    const errors = err.response.data.errors;
    // console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    // console.log(err);
  }
};
