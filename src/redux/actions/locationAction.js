import { http } from "../../util/setting";
import { DELETE_LOCATION_FAIL, DELETE_LOCATION_SUCCESS, GET_LOCATION_FROM_API, UPDATE_LOCATION_FAIL, UPDATE_LOCATION_SUCCESS } from "../const/constant";

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
      if (result.status === 200) {
        dispatch({
          type: DELETE_LOCATION_SUCCESS,
          data: result.data._id,
        });
      } else {
        dispatch({
          type: DELETE_LOCATION_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: DELETE_LOCATION_FAIL,
      });
    }
  };
};

export const updateLocationAPI = (id, info) => {
  return async (dispatch) => {
    try {
      let result = await http.put("/api/locations/" + id, info);
      if (result.status === 200) {
        dispatch({
          type: UPDATE_LOCATION_SUCCESS,
          data: result.data,
        });
      } else {
        dispatch({
          type: UPDATE_LOCATION_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_LOCATION_FAIL,
      });
    }
  };
};
