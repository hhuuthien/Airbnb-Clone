import { http } from "../../util/setting";
import { CREATE_TICKET_FAIL, CREATE_TICKET_SUCCESS } from "../const/constant";

export const createTicket = (checkIn, checkOut, userId, roomId) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/tickets", { checkIn, checkOut, userId, roomId });
      console.log(result.data);
      dispatch({
        type: CREATE_TICKET_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_TICKET_FAIL,
      });
    }
  };
};
