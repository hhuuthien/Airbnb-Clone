import { GET_ROOM_BY_LOCATION } from "../const/constant";

const defaultState = {
  roomList: [],
};

export const roomReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ROOM_BY_LOCATION: {
      return {
        ...state,
        roomList: action.data,
      };
    }
    default:
      return { ...state };
  }
};
