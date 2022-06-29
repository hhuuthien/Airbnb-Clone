import { http } from "../../util/setting";
import {
  CREATE_LOCATION_FAIL,
  CREATE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAIL,
  DELETE_LOCATION_SUCCESS,
  GET_LOCATION_DETAIL_API,
  GET_LOCATION_FROM_API,
  UPDATE_LOCATION_FAIL,
  UPDATE_LOCATION_SUCCESS,
} from "../const/constant";

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

export const getLocationDetailAPI = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/locations/" + id);
      dispatch({
        type: GET_LOCATION_DETAIL_API,
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
        type: DELETE_LOCATION_SUCCESS,
        data: result.data._id,
      });
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
      dispatch({
        type: UPDATE_LOCATION_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_LOCATION_FAIL,
      });
    }
  };
};

export const uploadImageLocationAPI = (id, file) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();
      formData.append("location", file);
      let result = await http.post("/api/locations/upload-images/" + id, formData);

      dispatch({
        type: UPDATE_LOCATION_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_LOCATION_FAIL,
      });
    }
  };
};

export const createLocationAPI = (info, image) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/locations", info);

      // Sau khi tạo thành công => có id => upload hình
      let formData = new FormData();
      formData.append("location", image);

      try {
        let result2 = await http.post("/api/locations/upload-images/" + result.data._id, formData);

        // tạo vị trí thành công và có luôn hình
        dispatch({
          type: CREATE_LOCATION_SUCCESS,
          data: result2.data,
        });
      } catch (error) {
        // tạo vị trí thành công nhưng không có hình, cần upload hình sau
        dispatch({
          type: CREATE_LOCATION_SUCCESS,
          data: result.data,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_LOCATION_FAIL,
      });
    }
  };
};
