import { http } from "../../util/setting";
import { CREATE_USER_FAIL, CREATE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_SUCCESS, GET_USER, GET_USER_DETAIL, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS } from "../const/constant";

export const getUserAPI = () => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/users/pagination");

      dispatch({
        type: GET_USER,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserDetailAPI = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/users/" + id);

      dispatch({
        type: GET_USER_DETAIL,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserAPI = (id, info) => {
  return async (dispatch) => {
    try {
      let result = await http.put("/api/users/" + id, info);

      dispatch({
        type: UPDATE_USER_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
      });
    }
  };
};

export const deleteUserAPI = (id) => {
  return async (dispatch) => {
    try {
      let result = await http.delete("/api/users/" + id);

      dispatch({
        type: DELETE_USER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
      });
    }
  };
};

export const createUserAPI = (info) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/api/users", info);

      dispatch({
        type: CREATE_USER_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAIL,
      });
    }
  };
};
