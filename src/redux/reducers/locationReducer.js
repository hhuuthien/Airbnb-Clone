import {
  CREATE_LOCATION_END,
  CREATE_LOCATION_FAIL,
  CREATE_LOCATION_SUCCESS,
  DELETE_LOCATION_END,
  DELETE_LOCATION_FAIL,
  DELETE_LOCATION_SUCCESS,
  GET_LOCATION_FROM_API,
  UPDATE_ARRAY_BY_FILTERING,
  UPDATE_ARRAY_BY_SEARCHING,
  UPDATE_LOCATION_END,
  UPDATE_LOCATION_FAIL,
  UPDATE_LOCATION_SUCCESS,
} from "../const/constant";

const defaultState = {
  locationList: [],
  locationListCopy: [],
  deleteStatus: "",
  updateStatus: "",
  createStatus: "",
};

export const locationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_LOCATION_FROM_API: {
      return {
        ...state,
        locationList: action.data,
        locationListCopy: action.data,
      };
    }
    case UPDATE_ARRAY_BY_SEARCHING: {
      return {
        ...state,
        locationList: action.data,
      };
    }
    case UPDATE_ARRAY_BY_FILTERING: {
      return {
        ...state,
        locationList: action.data,
      };
    }
    case DELETE_LOCATION_SUCCESS: {
      let locationListUpdated = state.locationList.filter((location) => location._id !== action.data);
      let locationListCopyUpdated = state.locationListCopy.filter((location) => location._id !== action.data);
      return {
        ...state,
        locationList: locationListUpdated,
        locationListCopy: locationListCopyUpdated,
        deleteStatus: "success",
      };
    }
    case DELETE_LOCATION_FAIL: {
      return {
        ...state,
        deleteStatus: "fail",
      };
    }
    case DELETE_LOCATION_END: {
      return {
        ...state,
        deleteStatus: "",
      };
    }
    case UPDATE_LOCATION_SUCCESS: {
      let index1 = state.locationList.findIndex((item) => item._id === action.data._id);
      state.locationList.splice(index1, 1, action.data);
      let index2 = state.locationListCopy.findIndex((item) => item._id === action.data._id);
      state.locationListCopy.splice(index2, 1, action.data);
      return {
        ...state,
        updateStatus: "success",
      };
    }
    case UPDATE_LOCATION_FAIL: {
      return {
        ...state,
        updateStatus: "fail",
      };
    }
    case UPDATE_LOCATION_END: {
      return {
        ...state,
        updateStatus: "",
      };
    }
    case CREATE_LOCATION_SUCCESS: {
      return {
        ...state,
        locationList: [...state.locationList, action.data],
        locationListCopy: [...state.locationListCopy, action.data],
        createStatus: "success",
      };
    }
    case CREATE_LOCATION_FAIL: {
      return {
        ...state,
        createStatus: "fail",
      };
    }
    case CREATE_LOCATION_END: {
      return {
        ...state,
        createStatus: "",
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
