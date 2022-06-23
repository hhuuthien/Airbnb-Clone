import { http } from "../../util/setting";

export const loginAPI = (loginInfo) => {
  return async (dispatch) => {
    console.log(loginInfo);
    let result = await http.post("/api/auth/login", loginInfo);
    console.log(result);
    // dispatch({
    //   type: GET_LOCATION_FROM_API,
    //   data: result.data,
    // });
  };
};
