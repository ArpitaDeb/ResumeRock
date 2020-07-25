import React from "react";

export default function FormContainer(props) {
  return(
    <div>
      <h1 className="mb-5"> {props.title} </h1>
      {props.children}
    </div>
  );
}