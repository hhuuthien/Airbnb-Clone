import { http } from "../../util/setting";
import { GET_USER, GET_USER_DETAIL } from "../const/constant";

export const getUserAPI = () => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/users/pagination");

      dispatch({
        type: GET_USER,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserDetailAPI = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/users/" + id);

      dispatch({
        type: GET_USER_DETAIL,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserDetailAPI = (id, info) => {
  return async (dispatch) => {
    try {
      let result = await http.put("/api/users/" + id);
      console.log(result);

      //   dispatch({
      //     type: GET_USER_DETAIL,
      //     data: result.data,
      //   });
    } catch (error) {
      console.log(error);
    }
  };
};
