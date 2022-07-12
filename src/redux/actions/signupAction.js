import { ACCESS_TOKEN, http, USER_LOGIN } from "../../util/setting";
import { START_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL } from "../const/constant";

export const signupAPI = (signupInfo) => {
  return async (dispatch) => {
    dispatch({
      type: START_SIGNUP,
    });

    try {
      let result = await http.post("/api/auth/register", signupInfo);
      if (result.status === 200) {
        // đăng kí thành công
        dispatch({
          type: SIGNUP_SUCCESS,
        });
      } else {
        // đăng kí thất bại
        dispatch({
          type: SIGNUP_FAIL,
        });
      }
    } catch (error) {
      // đăng kí thất bại
      dispatch({
        type: SIGNUP_FAIL,
      });
      console.log(error);
    }
  };
};
