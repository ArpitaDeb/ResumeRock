import React from "react";

export default function SummarySection(props) {

  return (
    <div>
      <h4 className="text-uppercase bold">
        {props.heading ? props.heading : ""}
      </h4>
      <p className="mt-2 ml-4">
        {props.body ? props.body : ""}
      </p>
    </div>
  );
}