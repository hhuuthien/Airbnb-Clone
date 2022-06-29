import { CLEAR_USER_DETAIL, GET_USER, GET_USER_DETAIL } from "../const/constant";

const defaultState = {
  userList: [],
  userDetail: {},
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
    default: {
      return {
        ...state,
      };
    }
  }
};
