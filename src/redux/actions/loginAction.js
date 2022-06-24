import { ACCESS_TOKEN, http } from "../../util/setting";
import { LOGIN_SUCCESS, CHANGE_STATUS_LOGGING_IN } from "../const/constant";

export const loginAPI = (loginInfo) => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_STATUS_LOGGING_IN,
      data: true,
    });

    let result = await http.post("/api/auth/login", loginInfo);
    if (result.status === 200) {
      // đăng nhập thành công
      // save token to localStorage
      localStorage.setItem(ACCESS_TOKEN, result.data.token);
      // save user data to redux
      setTimeout(() => {
        dispatch({
          type: LOGIN_SUCCESS,
          data: result.data.user,
        });
      }, 3000);
    }
  };
};
