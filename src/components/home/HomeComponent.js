import React from "react";
import MaterialUiForm from "./AccountForm";

const HomeComponent = () => (
  <div
    style={{
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <MaterialUiForm onSubmit={() => console.log("Hi")} />
  </div>
);

export default HomeComponent;
