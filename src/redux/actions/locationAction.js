import { http } from "../../util/setting";
import { DELETE_LOCATION, GET_LOCATION_FROM_API } from "../const/constant";

export const getLocationAPI = () => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/locations");
      dispatch({
        type: GET_LOCATION_FROM_API,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteLocationAPI = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.delete("/api/locations/" + id);
      dispatch({
        type: DELETE_LOCATION,
        status: "success",
        data: result.data._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
