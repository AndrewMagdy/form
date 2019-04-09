import { ActionsObservable } from "redux-observable";
import * as actionsTypes from "../../../actions/types";
import { submitEpic, validateEpic } from "../homeEpics";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { delayDur } from "../../../constants/constants";

jest.mock("rxjs/ajax");

describe("HomeEpics", () => {
  jest.useFakeTimers();
  jest.runAllTimers();

  test("should submit successfly", () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot("-a", {
        a: { type: actionsTypes.SUBMIT_SUCCESS }
      });
      const state$ = null;
      const output$ = submitEpic(action$, state$);

      /*
        https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/testing/marble-testing.md
        NOTE: You may have to subtract 1 millisecond from the time you want to progress because 
        the alphanumeric marbles (representing an actual emitted value) advance time 1 virtual frame
         themselves already, after they emit. This can be very unintuitive and frustrating, 
         but for now it is indeed correct.
         Thats 2999ms instead of 3000ms

        */
      expectObservable(output$).toBe(`-a ${delayDur - 1}ms b`, {
        a: {
          type: actionsTypes.SHOW_DIALOG
        },
        b: {
          type: actionsTypes.HIDE_DIALOG
        }
      });
    });
  });

  test("Should validate successfly", done => {
    const action$ = ActionsObservable.of({
      type: actionsTypes.VALIDATE_IBAN_REQUEST,
      meta: { resolve: () => {}, reject: () => {} }
    });

    ajax.post.mockImplementation(() => {
      return of({ response: { valid: true } });
    });

    validateEpic(action$).subscribe(actual => {
      expect(actual).toMatchSnapshot();
      done();
    });
  });

  test("Should fail validation", done => {
    const action$ = ActionsObservable.of({
      type: actionsTypes.VALIDATE_IBAN_REQUEST,
      meta: { resolve: () => {}, reject: () => {} }
    });

    ajax.post.mockImplementation((url, headers) => {
      return of({ response: { valid: false } });
    });

    validateEpic(action$).subscribe(actual => {
      expect(actual).toMatchSnapshot();
      done();
    });
  });
});
