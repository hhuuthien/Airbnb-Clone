import { http } from "../../util/setting";
import {
  BOOKING_ROOM_FAIL,
  BOOKING_ROOM_SUCCESS,
  CREATE_TICKET_FAIL,
  CREATE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL,
  DELETE_TICKET_SUCCESS,
  GET_TICKET_BY_ROOM,
  GET_TICKET_BY_USER,
  GET_TICKET_BY_USER_IN_ROOM,
  UPDATE_TICKET_FAIL,
  UPDATE_TICKET_SUCCESS,
} from "../const/constant";

export const createTicketAPI = (checkIn, checkOut, userId, roomId) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/tickets", { checkIn, checkOut, userId, roomId });
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

export const bookRoom = (checkIn, checkOut, roomId) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/rooms/booking/", { roomId, checkIn, checkOut });
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
        type: GET_TICKET_BY_USER_IN_ROOM,
        data: result2,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTicketByUser = (userId) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/tickets/by-user?userId=" + userId);
      dispatch({
        type: GET_TICKET_BY_USER,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTicketByRoom = (roomId) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/tickets/by-room?roomId=" + roomId);
      dispatch({
        type: GET_TICKET_BY_ROOM,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTicket = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.delete("/api/tickets/" + id);
      dispatch({
        type: DELETE_TICKET_SUCCESS,
        data: result.data._id,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DELETE_TICKET_FAIL,
      });
    }
  };
};

export const updateTicket = (id, info) => {
  return async (dispatch) => {
    try {
      let result = await http.put("/api/tickets/" + id, info);
      dispatch({
        type: UPDATE_TICKET_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TICKET_FAIL,
      });
    }
  };
};
