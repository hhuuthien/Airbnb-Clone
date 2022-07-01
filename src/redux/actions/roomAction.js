import { http } from "../../util/setting";
import { GET_ROOM_BY_LOCATION } from "../const/constant";

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
