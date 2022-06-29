import { GET_USER } from "../const/constant";

const defaultState = {
  userList: [],
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        userList: action.data,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
