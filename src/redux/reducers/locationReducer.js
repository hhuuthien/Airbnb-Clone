import { GET_LOCATION_FROM_API, UPDATE_ARRAY_BY_SEARCHING, UPDATE_ARRAY_BY_FILTERING } from "../const/constant";

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
    default: {
      return {
        ...state,
      };
    }
  }
};
