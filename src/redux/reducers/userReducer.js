import { ACCESS_TOKEN, USER_LOGIN } from "../../util/setting";
import { LOGIN_FAIL, LOGIN_SUCCESS, SIGNUP_FAIL, SIGNUP_SUCCESS, SIGN_OUT, START_LOGIN, START_SIGNUP } from "../const/constant";

let userFromLocalStorage = {};
if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(ACCESS_TOKEN)) {
  userFromLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const defaultState = {
  user: userFromLocalStorage,
  loginStatus: "",
  signupStatus: "",
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_LOGIN: {
      return {
        ...state,
        loginStatus: "start",
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.data,
        loginStatus: "success",
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loginStatus: "fail",
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        user: {},
      };
    }
    case START_SIGNUP: {
      return {
        ...state,
        signupStatus: "start",
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        signupStatus: "success",
      };
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        signupStatus: "fail",
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
