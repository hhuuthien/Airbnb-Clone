import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { locationReducer } from "./reducers/locationReducer";

const rootReducer = combineReducers({
  locationReducer,
});

const middleWare = applyMiddleware(reduxThunk);

const composeCustom = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const store = createStore(rootReducer, composeCustom);
