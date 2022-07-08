import { CREATE_REVIEW_END, CREATE_REVIEW_FAIL, CREATE_REVIEW_SUCCESS, GET_REVIEW_BY_ROOM } from "../const/constant";

const defaultState = {
  reviewList: [],
  createReviewStatus: "",
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
    default:
      return {
        ...state,
      };
  }
};
