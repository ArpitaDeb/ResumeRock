import React from "react";
import "./style.css"

export default function ReferenceSection(props) {

  return (
    <div>
      <h4 className="text-uppercase mb-4">
        {props.heading}
      </h4>
      {
        props.referees.map(item => {
          if (item.req) {
            return (
              <div className="ml-4">Available upon request</div>
            )
          } else {
            return (
              <div className="ml-4">
                <div className="bold mt-3">{item.name}</div>
                <div>{item.email}</div>
              </div>
            )
          }
        })
      }
    </div>
  );

}