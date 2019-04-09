import { combineEpics } from "redux-observable";
import { submitEpic, validateEpic } from "./home/homeEpics";

const rootEpic = combineEpics(submitEpic, validateEpic);

export default rootEpic;
