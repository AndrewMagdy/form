import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import rootEpic from "../epics";
import rootReducer from "../reducers";

const configureStore = initialState => {
  const epicMiddleware = createEpicMiddleware();
  const middleware = applyMiddleware(epicMiddleware);
  const store = createStore(rootReducer, initialState, middleware);

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
