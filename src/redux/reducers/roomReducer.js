import {
  CLEAR_ROOM_DETAIL,
  CLEAR_ROOM_LIST,
  CREATE_ROOM_END,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
  DELETE_ROOM_END,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_SUCCESS,
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
  deleteStatus: "",
  createStatus: "",
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
    case DELETE_ROOM_SUCCESS: {
      return {
        ...state,
        roomDetail: {},
        deleteStatus: "success",
      };
    }
    case DELETE_ROOM_FAIL: {
      return {
        ...state,
        deleteStatus: "fail",
      };
    }
    case DELETE_ROOM_END: {
      return {
        ...state,
        deleteStatus: "",
      };
    }
    case CREATE_ROOM_SUCCESS: {
      return {
        ...state,
        roomList: [...state.roomList, action.data],
        roomListCopy: [...state.roomListCopy, action.data],
        createStatus: "success",
      };
    }
    case CREATE_ROOM_FAIL: {
      return {
        ...state,
        createStatus: "fail",
      };
    }
    case CREATE_ROOM_END: {
      return {
        ...state,
        createStatus: "",
      };
    }
    default:
      return { ...state };
  }
};
