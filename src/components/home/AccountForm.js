import React from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions/types";
import TextField from "@material-ui/core/TextField";
function submit(values, dispatch) {
  console.log("submit");
  dispatch({
    type: actions.SUBMIT_SUCCESS
  });
}
const asyncValidate = async (values, dispatch) => {
  try {
    await new Promise((resolve, reject) => {
      dispatch({
        type: actions.VALIDATE_IBAN,
        payload: values,
        meta: { resolve, reject } // the epic is responsible for calling these
      });
    });
  } catch (err) {
    console.log("err", err);
    throw {
      iban: "Invalid IBAN"
    };
  }
};

const validate = values => {
  const errors = {};
  const requiredFields = ["firstName", "lastName", "email", "iban"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (values.firstName && !/^[a-zA-Z]+$/.test(values.firstName)) {
    errors.firstName = "Invalid first name";
  }
  if (values.lastName && !/^[a-zA-Z]+$/.test(values.lastName)) {
    errors.lastName = "Invalid last name";
  }
  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    margin={"dense"}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  return (
    <form
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        marginRight: "25%",
        marginLeft: "25%",
        marginTop: "10%"
      }}
      onSubmit={handleSubmit}
    >
      <div>
        <Field
          name="firstName"
          component={renderTextField}
          label="First Name"
        />
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Last Name" />
      </div>
      <div>
        <Field name="email" component={renderTextField} label="Email" />
      </div>

      <div>
        <Field name="iban" component={renderTextField} label="IBAN" />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "MaterialUiForm", // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: ["iban"],
  onSubmit: submit
})(MaterialUiForm);
