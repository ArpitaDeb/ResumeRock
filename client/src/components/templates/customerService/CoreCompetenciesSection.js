import React from "react";
import "./style.css"
export default function CoreCompetenciesSection(props) {

  const Dimond = () => <span className="ml-1 mr-1">&#9830;</span>

  return (
    <div>
      <h5 className="text-uppercase mb-2">
        {props.heading}
      </h5>
      {
        props.skills.map(item => {
          return (
            <div className="ml-4">
              <Dimond />{item.name}
            </div>
          )
        })
      }

    </div>
  );

}