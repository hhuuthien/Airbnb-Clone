import { http } from "../../util/setting";
import {
  CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_SUCCESS,
  GET_REVIEW_BY_ROOM,
  GET_ROOM_BY_LOCATION,
  GET_ROOM_DETAIL,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_SUCCESS,
  UPLOAD_IMAGE_ROOM_FAIL,
  UPLOAD_IMAGE_ROOM_SUCCESS,
} from "../const/constant";

export const getRoomByLocationAPI = (locationId) => {
  return async (dispatch) => {
    try {
      let parameters = {
        params: {
          locationId: locationId,
        },
      };
      let result = await http.get("/api/rooms", parameters);

      dispatch({
        type: GET_ROOM_BY_LOCATION,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRoomDetail = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/rooms/" + id);
      dispatch({
        type: GET_ROOM_DETAIL,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateRoom = (id, info, locationNew) => {
  return async (dispatch) => {
    try {
      let result = await http.put("/api/rooms/" + id, info);
      dispatch({
        type: UPDATE_ROOM_SUCCESS,
        data: { ...result.data, locationId: locationNew },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ROOM_FAIL,
      });
    }
  };
};

export const uploadImageRoom = (id, image) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();
      formData.append("room", image);
      let result = await http.post("/api/rooms/upload-image/" + id, formData);

      dispatch({
        type: UPLOAD_IMAGE_ROOM_SUCCESS,
        data: result.data.image,
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_ROOM_FAIL,
      });
    }
  };
};

export const deleteRoom = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.delete("/api/rooms/" + id);
      dispatch({
        type: DELETE_ROOM_SUCCESS,
        data: result.data._id,
      });
    } catch (error) {
      dispatch({
        type: DELETE_ROOM_FAIL,
      });
    }
  };
};

export const createRoom = (info, location, image) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/rooms", info);

      // Sau khi t???o th??nh c??ng => c?? id => upload h??nh
      let formData = new FormData();
      formData.append("room", image);

      try {
        let result2 = await http.post("/api/rooms/upload-image/" + result.data._id, formData);

        // t???o ph??ng th??nh c??ng v?? c?? lu??n h??nh
        dispatch({
          type: CREATE_ROOM_SUCCESS,
          data: { ...result2.data, locationId: location },
        });
      } catch (error) {
        // t???o v??? tr?? th??nh c??ng nh??ng kh??ng c?? h??nh, c???n upload h??nh sau
        dispatch({
          type: CREATE_ROOM_SUCCESS,
          data: { ...result.data, locationId: location },
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_ROOM_FAIL,
      });
    }
  };
};
