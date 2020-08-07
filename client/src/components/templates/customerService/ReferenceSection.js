import React from "react";
import "./style.css"

export default function ReferenceSection(props) {

  if(!props.heading && ! props.referees){
    return "";
  }

  function printReferences (referees) {
    if (referees === undefined){
      return "";
    }else {
      const res= referees.map(item => {
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
        return res;
    }
  }
  return (
    <div>
      <h5 className="text-uppercase bold mb-2">
        {props.heading===undefined ? "" : props.heading}
      </h5>
      {
        printReferences(props.referees)
      }
    </div>
  );

}