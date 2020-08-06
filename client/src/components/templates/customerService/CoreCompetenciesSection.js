import React from "react";
import "./style.css"
export default function ExperienceSection(props) {

  const Dimond = () => <span className="ml-1 mr-1">&#9830;</span>

  return (
    <div>
      <h4 className="text-uppercase mb-4">
        {props.heading}
      </h4>
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