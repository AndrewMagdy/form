import React from "react";
import MaterialUiForm from "./AccountForm";

const HomeComponent = props => (
  <div
    style={{
      display: "flex",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <MaterialUiForm />
    {props.form}
  </div>
);

export default HomeComponent;
