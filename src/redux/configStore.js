import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { accountReducer } from "./reducers/accountReducer";
import { locationReducer } from "./reducers/locationReducer";
import { reviewReducer } from "./reducers/reviewReducer";
import { roomReducer } from "./reducers/roomReducer";
import { ticketReducer } from "./reducers/ticketReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  locationReducer,
  accountReducer,
  userReducer,
  roomReducer,
  reviewReducer,
  ticketReducer,
});

const middleWare = applyMiddleware(reduxThunk);

// const composeCustom = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const composeCustom = compose(middleWare);

export const store = createStore(rootReducer, composeCustom);
