import { LOGIN_USER_SUCCESS, LOGOUT_USER } from "./types";
import { obtainToken, logout } from "../../components/auth/Auth";

export function loginUserSuccess(token) {
  return { type: LOGIN_USER_SUCCESS, token };
}

export function loginUser(email, password) {
  return async function (dispatch) {
    try {
      const response = await obtainToken(email, password);
      dispatch(loginUserSuccess(response.data.access));
    } catch (error) {
      console.log("Error obtaining token. " + error);
    }
  };
}

export function logoutUserSuccess() {
  return { type: LOGOUT_USER };
}

export function logoutUser() {
  return async function (dispatch) {
    await logout();
    dispatch(logoutUserSuccess());
  };
}