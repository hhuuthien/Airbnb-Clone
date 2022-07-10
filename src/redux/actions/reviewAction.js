import { http } from "../../util/setting";
import { CREATE_REVIEW_FAIL, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_SUCCESS, GET_REVIEW_BY_ROOM } from "../const/constant";

export const getReview = (roomID) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/reviews/byRoom?roomId=" + roomID);
      dispatch({
        type: GET_REVIEW_BY_ROOM,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createReview = (id, content, user) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/reviews?roomId=" + id, content);
      dispatch({
        type: CREATE_REVIEW_SUCCESS,
        data: { ...result.data, userId: user },
      });
    } catch (error) {
      dispatch({
        type: CREATE_REVIEW_FAIL,
      });
    }
  };
};

export const editReview = (id, newContent) => {
  return async (dispatch) => {
    try {
      let result = await http.put("/api/reviews/" + id, { content: newContent });
      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteReview = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.delete("/api/reviews/" + id);
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        data: id,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
      });
    }
  };
};
