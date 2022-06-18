import { http } from "../../util/setting";
import { GET_LOCATION_FROM_API } from "../const/constant";

export const getLocationAPI = () => {
  return async (dispatch) => {
    let result = await http.get("/api/locations");
    dispatch({
      type: GET_LOCATION_FROM_API,
      data: result.data,
    });
  };
};
