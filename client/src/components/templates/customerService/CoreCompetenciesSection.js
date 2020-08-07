import React from "react";
import "./style.css"
export default function CoreCompetenciesSection(props) {
  if (!props.heading && !props.skills) {
    return "";
  }
  const Dimond = () => <span className="ml-1 mr-1">&#9830;</span>

  const printSkills = (skills) => {
    if (skills === undefined) {
      return ""
    } else {
      const s = skills.map(item => {
        return (
          <div className="ml-4">
            <Dimond />{item.name}
          </div>
        )
      })
      return s;
    }
  }

  return (
    <div>
      <h5 className="text-uppercase bold mb-2">
        {props.heading === undefined ? "" : props.heading}
      </h5>
      {
        printSkills(props.skills)
      }
    </div>
  );
}