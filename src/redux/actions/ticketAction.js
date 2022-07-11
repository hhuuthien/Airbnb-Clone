import { http } from "../../util/setting";
import { BOOKING_ROOM_FAIL, BOOKING_ROOM_SUCCESS, GET_TICKET_BY_USER } from "../const/constant";

// export const createTicket = (checkIn, checkOut, userId, roomId) => {
//   return async (dispatch) => {
//     try {
//       let result = await http.post("/api/tickets", { checkIn, checkOut, userId, roomId });
//       console.log(result.data);
//       dispatch({
//         type: CREATE_TICKET_SUCCESS,
//         data: result.data,
//       });
//     } catch (error) {
//       console.log(error);
//       dispatch({
//         type: CREATE_TICKET_FAIL,
//       });
//     }
//   };
// };

export const bookRoom = (checkIn, checkOut, roomId) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/rooms/booking/", { roomId, checkIn, checkOut });
      console.log(result.data);
      dispatch({
        type: BOOKING_ROOM_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: BOOKING_ROOM_FAIL,
      });
    }
  };
};

export const getTicketByUserInRoom = (userId, roomId) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/tickets/by-user?userId=" + userId);
      // result này là tất cả vé của user trong tất cả phòng, cần lọc ra chỉ trong roomId thôi
      let result2 = result.data.filter((ticket) => ticket.roomId._id === roomId);
      dispatch({
        type: GET_TICKET_BY_USER,
        data: result2,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
