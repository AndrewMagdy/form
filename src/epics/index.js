import { of } from "rxjs";
import { ofType, combineEpics } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { switchMap, map, catchError, retry } from "rxjs/operators";
import * as actions from "../actions/types";

const validateEpic = action$ =>
  action$.pipe(
    ofType(actions.VALIDATE_IBAN),
    switchMap(action => {
      let { resolve, reject } = action.meta || {};
      return ajax
        .post(`http://localhost:3050`, action.payload, {
          "Content-Type": "application/json"
        })
        .pipe(
          map(response => {
            if (response.response.valid) {
              if (resolve) {
                resolve();
              }
            } else {
              if (reject) {
                reject(response.response);
              }
            }
            return { type: actions.VALIDATE_SUCCESS };
          }),
          retry(2),
          catchError(error => {
            if (reject) {
              reject(error);
            }
            return of({
              type: actions.VALIDATE_SUCCESS
            });
          })
        );
    })
  );

const rootEpic = combineEpics(validateEpic);

export default rootEpic;
