import { ACCESS_TOKEN, USER_LOGIN } from "../../util/setting";
import {
  END_LOGIN,
  END_SIGNUP,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  SIGN_OUT,
  START_LOGIN,
  START_SIGNUP,
  UPDATE_USER_AVATAR_END,
  UPDATE_USER_AVATAR_FAIL,
  UPDATE_USER_AVATAR_SUCCESS,
} from "../const/constant";

let userFromLocalStorage = {};
if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(ACCESS_TOKEN)) {
  userFromLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const defaultState = {
  user: userFromLocalStorage,
  loginStatus: "",
  signupStatus: "",
  uploadAvatarStatus: "",
};

export const accountReducer = (state = defaultState, action) => {
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
    case END_SIGNUP: {
      return {
        ...state,
        signupStatus: "",
      };
    }
    case END_LOGIN: {
      return {
        ...state,
        loginStatus: "",
      };
    }
    case UPDATE_USER_AVATAR_SUCCESS: {
      // cập nhật luôn trong localStorage
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.data));

      return {
        ...state,
        uploadAvatarStatus: "success",
        user: action.data,
      };
    }
    case UPDATE_USER_AVATAR_FAIL: {
      return {
        ...state,
        uploadAvatarStatus: "fail",
      };
    }
    case UPDATE_USER_AVATAR_END: {
      return {
        ...state,
        uploadAvatarStatus: "",
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
