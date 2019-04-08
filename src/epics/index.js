import { of } from "rxjs";
import { ofType, combineEpics } from "redux-observable";
import { ajax } from "rxjs/ajax";
import {
  switchMap,
  map,
  catchError,
  retry,
  mergeMap,
  delay,
  tap,
  ignoreElements,
  concat
} from "rxjs/operators";
import * as actions from "../actions/types";

const printEpic = action$ =>
  action$.pipe(
    tap(action => {
      console.log(action);
    }),
    ignoreElements()
  );

const submitEpic = action$ =>
  action$.pipe(
    ofType(actions.SUBMIT_SUCCESS),
    switchMap(action =>
      of({ type: actions.SHOW_DIALOG }).pipe(
        concat(of({ type: actions.HIDE_DIALOG }).pipe(delay(3000)))
      )
    )
  );
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

const rootEpic = combineEpics(submitEpic, validateEpic, printEpic);

export default rootEpic;
