import { of } from "rxjs";
import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import {
  switchMap,
  map,
  catchError,
  retry,
  delay,
  concat,
  exhaustMap
} from "rxjs/operators";
import {
  showDialog,
  hideDialog,
  validateIbanSuccess,
  validateIbanFail
} from "../../actions/home/homeActions";
import { delayDur } from "../../constants/constants";
import * as actionsTypes from "../../actions/types";

export const submitEpic = action$ =>
  action$.pipe(
    ofType(actionsTypes.SUBMIT_SUCCESS),
    exhaustMap(action =>
      of(showDialog()).pipe(concat(of(hideDialog()).pipe(delay(delayDur))))
    )
  );

export const validateEpic = action$ =>
  action$.pipe(
    ofType(actionsTypes.VALIDATE_IBAN_REQUEST),
    switchMap(action => {
      let { resolve, reject } = action.meta || {};
      return ajax
        .post(process.env.REACT_APP_API_ENDPOINT, action.payload, {
          "Content-Type": "application/json"
        })
        .pipe(
          map(response => {
            if (response.response.valid) {
              if (resolve) {
                resolve();
                return validateIbanSuccess();
              }
            } else {
              if (reject) {
                reject(response.response);
                return validateIbanFail();
              }
            }
          }),
          retry(2),
          catchError(error => {
            if (reject) {
              reject(error);
            }
            return of({
              type: validateIbanFail()
            });
          })
        );
    })
  );
