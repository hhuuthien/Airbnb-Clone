import { CHANGE_STATUS_LOGGING_IN, LOGIN_SUCCESS } from "../const/constant";

const defaultState = {
  user: {},
  isLoggingIn: false,
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.data,
        isLoggingIn: false,
      };
    }
    case CHANGE_STATUS_LOGGING_IN: {
      return {
        ...state,
        isLoggingIn: action.data,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
