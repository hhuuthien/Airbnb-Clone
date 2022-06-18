import { GET_LOCATION_FROM_API } from "../const/constant";

const defaultState = {
  locationList: [],
};

export const locationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_LOCATION_FROM_API: {
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
