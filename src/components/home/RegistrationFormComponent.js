import React from "react";
import { registrationFormId } from "../../constants/constants";
import { Field, reduxForm } from "redux-form";
import { validateIban, submitForm } from "../../actions/home/homeActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const submit = (values, dispatch) => {
  submitForm(values)(dispatch);
};

const asyncValidate = async (values, dispatch) => {
  try {
    await new Promise((resolve, reject) => {
      validateIban(values, { resolve, reject })(dispatch);
    });
  } catch (err) {
    return Promise.reject({
      iban: "Invalid IBAN"
    });
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

const RegistrationForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing={24}
      >
        <Grid item xs={12}>
          <Field
            name="firstName"
            component={renderTextField}
            label="First Name"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="lastName"
            component={renderTextField}
            label="Last Name"
          />
        </Grid>
        <Grid item xs={12}>
          <Field name="email" component={renderTextField} label="Email" />
        </Grid>

        <Grid item xs={12}>
          <Field name="iban" component={renderTextField} label="IBAN" />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={pristine || submitting}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default reduxForm({
  form: registrationFormId,
  validate,
  asyncValidate,
  asyncBlurFields: ["iban"],
  onSubmit: submit
})(RegistrationForm);
