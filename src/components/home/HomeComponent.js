import React from "react";
import RegistrationForm from "./RegistrationFormComponent";

const HomeComponent = props => (
  <div
    style={{
      display: "flex",
      flex: 1,
      flexDirection: "column"
    }}
  >
    {props.showMessage && (
      <h1
        style={{
          display: "flex",
          flex: 1,
          alignSelf: "center"
        }}
      >
        Success
      </h1>
    )}
    <RegistrationForm />
  </div>
);

export default HomeComponent;
