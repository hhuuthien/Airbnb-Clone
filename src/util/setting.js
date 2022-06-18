import axios from "axios";

export const DOMAIN = "https://airbnb.cybersoft.edu.vn/";
export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMyIsIkhldEhhblN0cmluZyI6IjIwLzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2NjIyNDAwMDAwMCIsIm5iZiI6MTYzODExODgwMCwiZXhwIjoxNjY2MzcxNjAwfQ.hoaq9WsA187Q0NvdBYPZsn8c2CRg_ZE4mQO5_lUyAL4";
export const USER_LOGIN = "userLogin";
export const ACCESS_TOKEN = "accessToken";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 10000,
});

http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ["tokenByClass"]: TOKEN_CYBERSOFT,
      ["Authorization"]: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    };
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);
