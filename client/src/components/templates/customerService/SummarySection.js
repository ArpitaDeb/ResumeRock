import React from "react";

export default function SummarySection(props) {

  return (
    <div>
      <h3 className="text-uppercase">
        {props.heading}
      </h3>
      <p className="mt-4 ml-4">
        {props.body}
      </p>
    </div>
  );
}