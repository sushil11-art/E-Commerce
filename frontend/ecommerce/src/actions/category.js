import axios from "../axios/axios";
import { CATEGORIES } from "./types";

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/category/all-categories");
    dispatch({ type: CATEGORIES, payload: res.data });
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
