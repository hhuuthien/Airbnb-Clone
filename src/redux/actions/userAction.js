import { http } from "../../util/setting";
import { GET_USER } from "../const/constant";

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
