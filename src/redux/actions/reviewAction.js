import { http } from "../../util/setting";
import { CREATE_REVIEW_FAIL, CREATE_REVIEW_SUCCESS } from "../const/constant";

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
