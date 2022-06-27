import { GET_LOCATION_FROM_API, UPDATE_ARRAY_BY_SEARCHING, UPDATE_ARRAY_BY_FILTERING, DELETE_LOCATION, UPDATE_LOCATION } from "../const/constant";

const defaultState = {
  locationList: [],
  locationListCopy: [],
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
    case DELETE_LOCATION: {
      if (action.status === "success") {
        let locationListUpdated = state.locationList.filter((location) => location._id !== action.data);
        let locationListCopyUpdated = state.locationListCopy.filter((location) => location._id !== action.data);
        return {
          ...state,
          locationList: locationListUpdated,
          locationListCopy: locationListCopyUpdated,
        };
      }
    }
    case UPDATE_LOCATION: {
      if (action.status === "success") {
        let index1 = state.locationList.findIndex((item) => item._id === action.data._id);
        state.locationList.splice(index1, 1, action.data);
        let index2 = state.locationListCopy.findIndex((item) => item._id === action.data._id);
        state.locationListCopy.splice(index2, 1, action.data);
        return {
          ...state,
        };
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
