import {
  BOOKING_ROOM_END,
  BOOKING_ROOM_FAIL,
  BOOKING_ROOM_SUCCESS,
  CLEAR_TICKET_BY_USER,
  CREATE_TICKET_END,
  CREATE_TICKET_FAIL,
  CREATE_TICKET_SUCCESS,
  GET_TICKET_BY_USER,
} from "../const/constant";

const defaultState = {
  ticketDetail: {},
  userTicketInThisRoom: [],
  createTicketStatus: "",
  bookingStatus: "",
};

export const ticketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TICKET_SUCCESS: {
      return {
        ...state,
        ticketDetail: action.data,
        createTicketStatus: "success",
      };
    }
    case CREATE_TICKET_FAIL: {
      return {
        ...state,
        createTicketStatus: "fail",
      };
    }
    case CREATE_TICKET_END: {
      return {
        ...state,
        createTicketStatus: "",
      };
    }
    case BOOKING_ROOM_SUCCESS: {
      return {
        ...state,
        bookingStatus: "success",
      };
    }
    case BOOKING_ROOM_FAIL: {
      return {
        ...state,
        bookingStatus: "fail",
      };
    }
    case BOOKING_ROOM_END: {
      return {
        ...state,
        bookingStatus: "",
      };
    }
    case GET_TICKET_BY_USER: {
      return {
        ...state,
        userTicketInThisRoom: action.data,
      };
    }
    case CLEAR_TICKET_BY_USER: {
      return {
        ...state,
        userTicketInThisRoom: [],
      };
    }
    default:
      return { ...state };
  }
};
