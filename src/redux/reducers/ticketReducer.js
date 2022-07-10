import { CREATE_TICKET_END, CREATE_TICKET_FAIL, CREATE_TICKET_SUCCESS } from "../const/constant";

const defaultState = {
  ticketDetail: {},
  createTicketStatus: "",
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
    default:
      return { ...state };
  }
};
