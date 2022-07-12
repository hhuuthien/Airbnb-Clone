import { ACCESS_TOKEN, http, USER_LOGIN } from "../../util/setting";
import { START_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../const/constant";

export const loginAPI = (loginInfo) => {
  return async (dispatch) => {
    dispatch({
      type: START_LOGIN,
    });

    try {
      let result = await http.post("/api/auth/login", loginInfo);
      if (result.status === 200) {
        // đăng nhập thành công
        localStorage.setItem(ACCESS_TOKEN, result.data.token);
        localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.user));
        dispatch({
          type: LOGIN_SUCCESS,
          data: result.data.user,
        });
      } else {
        // đăng nhập thất bại
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    } catch (error) {
      // đăng nhập thất bại
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};
