import { GET_ROOM_BY_LOCATION, UPDATE_ROOM_LIST_BY_SEARCHING_AND_FILTERING } from "../const/constant";

const defaultState = {
  roomList: [],
  roomListCopy: [],
};

export const roomReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ROOM_BY_LOCATION: {
      return {
        ...state,
        roomList: action.data,
        roomListCopy: action.data,
      };
    }
    case UPDATE_ROOM_LIST_BY_SEARCHING_AND_FILTERING: {
      return {
        ...state,
        roomList: action.data,
      };
    }
    default:
      return { ...state };
  }
};
