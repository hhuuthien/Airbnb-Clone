import { http } from "../../util/setting";
import { GET_REVIEW_BY_ROOM, GET_ROOM_BY_LOCATION, GET_ROOM_DETAIL, UPDATE_ROOM_FAIL, UPDATE_ROOM_SUCCESS } from "../const/constant";

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

export const getRoomReview = (roomID) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/reviews/byRoom?roomId=" + roomID);
      dispatch({
        type: GET_REVIEW_BY_ROOM,
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
