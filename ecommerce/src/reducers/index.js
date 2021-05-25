import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import category from "./category";
import customerProduct from "./customerProduct";
import cart from "./cart";
import order from "./order";
import adminCategory from "./adminCategory";

import adminProduct from "./adminProduct";

export default combineReducers({ alert, auth, customerProduct, category ,cart,order,adminCategory,adminProduct});
