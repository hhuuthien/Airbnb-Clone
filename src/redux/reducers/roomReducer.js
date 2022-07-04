import {
  CLEAR_ROOM_DETAIL,
  CLEAR_ROOM_LIST,
  GET_REVIEW_BY_ROOM,
  GET_ROOM_BY_LOCATION,
  GET_ROOM_DETAIL,
  UPDATE_ROOM_END,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_LIST_BY_SEARCHING_AND_FILTERING,
  UPDATE_ROOM_SUCCESS,
  UPLOAD_IMAGE_ROOM_END,
  UPLOAD_IMAGE_ROOM_FAIL,
  UPLOAD_IMAGE_ROOM_SUCCESS,
} from "../const/constant";

const defaultState = {
  roomList: [],
  roomListCopy: [],
  roomDetail: {},
  roomReview: [],
  updateStatus: "",
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
    case CLEAR_ROOM_LIST: {
      return {
        ...state,
        roomList: [],
        roomListCopy: [],
      };
    }
    case UPDATE_ROOM_SUCCESS: {
      return {
        ...state,
        roomDetail: action.data,
        updateStatus: "success",
      };
    }
    case UPDATE_ROOM_FAIL: {
      return {
        ...state,
        updateStatus: "fail",
      };
    }
    case UPDATE_ROOM_END: {
      return {
        ...state,
        updateStatus: "",
      };
    }
    case UPLOAD_IMAGE_ROOM_SUCCESS: {
      return {
        ...state,
        roomDetail: { ...state.roomDetail, image: action.data },
        updateStatus: "success",
      };
    }
    case UPLOAD_IMAGE_ROOM_FAIL: {
      return {
        ...state,
        updateStatus: "fail",
      };
    }
    case UPLOAD_IMAGE_ROOM_END: {
      return {
        ...state,
        updateStatus: "",
      };
    }
    default:
      return { ...state };
  }
};
