import { ACCESS_TOKEN, USER_LOGIN } from "../../util/setting";
import { START_LOGIN, LOGIN_SUCCESS } from "../const/constant";

let userFromLocalStorage = {};
if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(ACCESS_TOKEN)) {
  userFromLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const defaultState = {
  user: userFromLocalStorage,
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
    case START_LOGIN: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
