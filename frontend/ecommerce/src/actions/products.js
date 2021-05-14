// import base Url of axios
import axios from "../axios/axios";
import { PRODUCT, PRODUCTS, PRODUCT_FAIL } from "./types";

export const customerProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/product/customer/products");
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const productDetails = (productID) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/customer/${productID}`);
    // console.log(res.data.product);
    dispatch({ type: PRODUCT, payload: res.data.product });
  } catch (err) {
    // const errors = err.response.data.;
    // console.log(err.response.data);
    dispatch({
      type: PRODUCT_FAIL,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const searchProduct = (search) => async (dispatch) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "Application/json",
    //   },
    // };
    const res=await axios.get(`/product/search-product/${search}`)
    dispatch({ type: PRODUCTS, payload: res.data });
    // const res = await axios.get("/product/search-product" + `?title=${search}`,config);
    // const res=await axios.get('/product/search-product',{ params: { title:search} })
    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const categoryProductSearch = (categoryID,search) => async (dispatch) => {
  try {
    const res=await axios.get(`/product/category/${categoryID}/${search}`)
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const filterProductsCheapest = (price) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/sort-price-products/${price}`);
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
export const filterProductsExpensive = (price) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/sort-price-products/${price}`);
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const filterProductsNew = (date) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/sort-date-products/${date}`);
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
export const filterProductsOld = (date) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/sort-date-products/${date}`);
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// ..................get products by category.........................

export const categoryProducts = (categoryID) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/category-products/${categoryID}`);
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const categoryProductsCheapest = (categoryID, price) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `/product/category-products/${categoryID}/${price}`
    );
    console.log(res.data);
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
export const categoryProductsExpensive = (categoryID, price) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `/product/category-products/${categoryID}/${price}`
    );
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const categoryProductsNew = (categoryID, date) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/product/category-products/${categoryID}/${date}`
    );
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
export const categoryProductsOld = (categoryID, date) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/product/category-products/${categoryID}/${date}`
    );
    dispatch({ type: PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
