import {
  CLEAR_REVIEW_LIST,
  CREATE_REVIEW_END,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_SUCCESS,
  DELETE_REVIEW_END,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
  GET_REVIEW_BY_ROOM,
} from "../const/constant";

const defaultState = {
  reviewList: [],
  createReviewStatus: "",
  deleteReviewStatus: "",
};

export const reviewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_REVIEW_BY_ROOM: {
      return {
        ...state,
        reviewList: action.data,
      };
    }
    case CREATE_REVIEW_SUCCESS: {
      return {
        ...state,
        reviewList: [...state.reviewList, action.data],
        createReviewStatus: "success",
      };
    }
    case CREATE_REVIEW_FAIL: {
      return {
        ...state,
        createReviewStatus: "fail",
      };
    }
    case CREATE_REVIEW_END: {
      return {
        ...state,
        createReviewStatus: "",
      };
    }
    case CLEAR_REVIEW_LIST: {
      return {
        ...state,
        reviewList: [],
      };
    }
    case DELETE_REVIEW_SUCCESS: {
      const newReviewList = state.reviewList.filter((item) => item._id !== action.data);
      return {
        ...state,
        reviewList: newReviewList,
        deleteReviewStatus: "success",
      };
    }
    case DELETE_REVIEW_FAIL: {
      return {
        ...state,
        deleteReviewStatus: "fail",
      };
    }
    case DELETE_REVIEW_END: {
      return {
        ...state,
        deleteReviewStatus: "",
      };
    }
    default:
      return {
        ...state,
      };
  }
};
