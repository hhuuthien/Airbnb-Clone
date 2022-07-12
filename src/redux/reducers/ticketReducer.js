import {
  BOOKING_ROOM_END,
  BOOKING_ROOM_FAIL,
  BOOKING_ROOM_SUCCESS,
  CLEAR_TICKET_BY_USER,
  CREATE_TICKET_END,
  CREATE_TICKET_FAIL,
  CREATE_TICKET_SUCCESS,
  DELETE_TICKET_END,
  DELETE_TICKET_FAIL,
  DELETE_TICKET_SUCCESS,
  GET_TICKET_BY_USER,
  GET_TICKET_BY_USER_IN_ROOM,
  UPDATE_TICKET_END,
  UPDATE_TICKET_FAIL,
  UPDATE_TICKET_SUCCESS,
} from "../const/constant";

const defaultState = {
  ticketDetail: {},
  userTicketInThisRoom: [],
  userTicket: [],
  createTicketStatus: "",
  deleteTicketStatus: "",
  updateTicketStatus: "",
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
    case GET_TICKET_BY_USER_IN_ROOM: {
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
    case GET_TICKET_BY_USER: {
      return {
        ...state,
        userTicket: action.data,
      };
    }
    case DELETE_TICKET_SUCCESS: {
      return {
        ...state,
        deleteTicketStatus: "success",
        userTicket: state.userTicket.filter((item) => item._id !== action.data),
      };
    }
    case DELETE_TICKET_FAIL: {
      return {
        ...state,
        deleteTicketStatus: "fail",
      };
    }
    case DELETE_TICKET_END: {
      return {
        ...state,
        deleteTicketStatus: "",
      };
    }
    case UPDATE_TICKET_SUCCESS: {
      return {
        ...state,
        updateTicketStatus: "success",
      };
    }
    case UPDATE_TICKET_FAIL: {
      return {
        ...state,
        updateTicketStatus: "fail",
      };
    }
    case UPDATE_TICKET_END: {
      return {
        ...state,
        updateTicketStatus: "",
      };
    }
    default:
      return { ...state };
  }
};
