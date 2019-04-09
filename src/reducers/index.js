import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import homeReducer from "./home/homeReducer";

const rootReducer = combineReducers({
  home: homeReducer,
  form: formReducer
});

export default rootReducer;
