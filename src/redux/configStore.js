import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { locationReducer } from "./reducers/locationReducer";
import { accountReducer } from "./reducers/accountReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  locationReducer,
  accountReducer,
  userReducer,
});

const middleWare = applyMiddleware(reduxThunk);

const composeCustom = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const composeCustom = compose(middleWare);

export const store = createStore(rootReducer, composeCustom);
