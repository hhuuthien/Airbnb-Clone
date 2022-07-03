import { CLEAR_ROOM_DETAIL, GET_REVIEW_BY_ROOM, GET_ROOM_BY_LOCATION, GET_ROOM_DETAIL, UPDATE_ROOM_LIST_BY_SEARCHING_AND_FILTERING } from "../const/constant";

const defaultState = {
  roomList: [],
  roomListCopy: [],
  roomDetail: {},
  roomReview: [],
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
    case GET_ROOM_DETAIL: {
      return {
        ...state,
        roomDetail: action.data,
      };
    }
    case CLEAR_ROOM_DETAIL: {
      return {
        ...state,
        roomDetail: {},
      };
    }
    case GET_REVIEW_BY_ROOM: {
      return {
        ...state,
        roomReview: action.data,
      };
    }
    default:
      return { ...state };
  }
};
