import {
  CLEAR_USER_DETAIL,
  CREATE_USER_END,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  DELETE_USER_END,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USER,
  GET_USER_DETAIL,
  UPDATE_USER_END,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "../const/constant";

const defaultState = {
  userList: [],
  userDetail: {},
  updateStatus: "",
  deleteStatus: "",
  createStatus: "",
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        userList: action.data,
      };
    }
    case GET_USER_DETAIL: {
      return {
        ...state,
        userDetail: action.data,
      };
    }
    case CLEAR_USER_DETAIL: {
      return {
        ...state,
        userDetail: {},
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        userDetail: action.data,
        updateStatus: "success",
      };
    }
    case UPDATE_USER_FAIL: {
      return {
        ...state,
        updateStatus: "fail",
      };
    }
    case UPDATE_USER_END: {
      return {
        ...state,
        updateStatus: "",
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        userDetail: {},
        deleteStatus: "success",
      };
    }
    case DELETE_USER_FAIL: {
      return {
        ...state,
        deleteStatus: "fail",
      };
    }
    case DELETE_USER_END: {
      return {
        ...state,
        deleteStatus: "",
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        createStatus: "success",
        userList: [...state.userList, action.data],
      };
    }
    case CREATE_USER_FAIL: {
      return {
        ...state,
        createStatus: "fail",
      };
    }
    case CREATE_USER_END: {
      return {
        ...state,
        createStatus: "",
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
