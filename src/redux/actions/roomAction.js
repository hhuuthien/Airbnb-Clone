import { http } from "../../util/setting";
import { GET_REVIEW_BY_ROOM, GET_ROOM_BY_LOCATION, GET_ROOM_DETAIL } from "../const/constant";

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
