import { ACCESS_TOKEN, http, USER_LOGIN } from "../../util/setting";
import { START_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL } from "../const/constant";

export const signupAPI = (signupInfo) => {
  return async (dispatch) => {
    dispatch({
      type: START_SIGNUP,
    });

    try {
      let result = await http.post("/api/auth/register", signupInfo);
      console.log(result);
      if (result.status === 200) {
        // đăng kí thành công
        setTimeout(() => {
          dispatch({
            type: SIGNUP_SUCCESS,
          });
        }, 5000);
      } else {
        // đăng kí thất bại
        setTimeout(() => {
          dispatch({
            type: SIGNUP_FAIL,
          });
        }, 5000);
      }
    } catch (error) {
      // đăng kí thất bại
      setTimeout(() => {
        dispatch({
          type: SIGNUP_FAIL,
        });
      }, 5000);
      console.log(error);
    }
  };
};
