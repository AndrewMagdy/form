import {
  SHOW_DIALOG,
  HIDE_DIALOG,
  VALIDATE_IBAN_FAIL,
  VALIDATE_IBAN_SUCCESS,
  VALIDATE_IBAN_REQUEST,
  SUBMIT_SUCCESS
} from "../types";

export const showDialog = () => ({
  type: SHOW_DIALOG
});

export const hideDialog = () => ({
  type: HIDE_DIALOG
});

export const validateIbanSuccess = () => ({
  type: VALIDATE_IBAN_SUCCESS
});

export const validateIbanFail = () => ({
  type: VALIDATE_IBAN_FAIL
});

export const validateIbanRequest = (value, { resolve, reject }) => ({
  type: VALIDATE_IBAN_REQUEST,
  payload: value,
  meta: { resolve, reject } // the epic is responsible for calling these\
});

export const submitFormSuccess = values => ({
  type: SUBMIT_SUCCESS
});

export const validateIban = (value, { resolve, reject }) => dispatch => {
  dispatch(validateIbanRequest(value, { resolve, reject }));
};

export const submitForm = values => dispatch => {
  dispatch(submitFormSuccess(values));
};
