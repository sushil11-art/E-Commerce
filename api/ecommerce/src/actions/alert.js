import { v4 as uuid } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "./types";

export const setAlert = (msg, alerType, timeout = 5000) => (dispatch) => {
  const id = uuid();
  dispatch({ type: SET_ALERT, payload: { msg, alerType, id } });
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, timeout);
};
