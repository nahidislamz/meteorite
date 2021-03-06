import axiosInstance, { setNewHeaders } from "../../Axios";

export async function signUp(email, username, password) {
  const response = await axiosInstance.post("users/create/", {
    email,
    username,
    password,
  });
  localStorage.setItem("user", response.data);
  return response;
}

export async function obtainToken(email, password) {
  const response = await axiosInstance.post("token/", {
    email,
    password,
  });
  setNewHeaders(response);
  return response;
}

export async function refreshToken(refresh) {
  const response = await axiosInstance.post("token/refresh/", {
    refresh,
  });
  setNewHeaders(response);
  return response;
}

// eslint-disable-next-line
export async function logout(accessToken) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // TODO: invalidate token on backend
}

export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

