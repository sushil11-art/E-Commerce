import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  GOOGLE_LOGIN_SUCCESS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  // isAuthenticated:null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return state;
      return { ...state, token: null, loading: false };
    case LOGIN_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
      // console.log(payload.token);
      localStorage.setItem("token", payload.token);
      // console.log(localStorage.getItem("token"));
      return { ...state, ...payload, loading: false };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return { ...state, token: null, loading: false };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, token: null, loading: false };
    default:
      return state;
  }
}
