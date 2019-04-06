import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";

const configureStore = initialState => {
  const middleware = applyMiddleware();

  return createStore(rootReducer, initialState, middleware);
};

export default configureStore;
