import React from "react";
import RegistrationForm from "./RegistrationFormComponent";
import { registrationFormId } from "../../constants/constants";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";

const HomeComponent = props => (
  <div className={props.classes.root}>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
      spacing={24}
    >
      <Grid item xs={12}>
        <Paper className={props.classes.paper}>RegistrationForm </Paper>
      </Grid>
      <Grid item xs={12}>
        {props.showMessage && (
          <Paper className={props.classes.paper}>
            {" "}
            Congratz! All data is valid{" "}
          </Paper>
        )}
      </Grid>
      <Grid item xs={6}>
        <RegistrationForm />
      </Grid>
      <Grid item xs={12}>
        {props.formState[registrationFormId] &&
          props.formState[registrationFormId].values && (
            <Paper className={props.classes.paper}>
              <h1> Form Data</h1>
              {Object.keys(props.formState[registrationFormId].values).map(
                key => (
                  <li key={key}>
                    {" "}
                    {key}: {props.formState[registrationFormId].values[key]}
                  </li>
                )
              )}
            </Paper>
          )}
      </Grid>
    </Grid>
  </div>
);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

export default withStyles(styles)(HomeComponent);
