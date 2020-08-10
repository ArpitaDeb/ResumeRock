import React from "react";
import "./style.css"
import showDateFromTo from "../../../helpers/dateUtils";

export default function EducationSection(props) {

  const Dimond = () => <span className="ml-1 mr-1">&#9830;</span>

  if(!props.heading && ! props.educationInfo){
    return "";
  }

  function printEducation(educationList) {
    if (educationList === undefined) {
      return ""
    } else {
      const res = educationList.map(item => {
        return (
          <div className="ml-4">
            <Dimond />{item.typeOfDegree} in {item.fieldOfStudy}
            <div className="ml-2">
              <div className="bold mt-1">{item.institution}</div>
              <span className="bold">{item.city}, {item.country}</span>
              <div className="text-muted">{showDateFromTo(item.start_date, item.end_date)}</div>
            </div>
          </div>
        )
      })
      return res;
    }
  }

  return (
    <div>
      <h5 className="text-uppercase bold mb-2">
        {props.heading === undefined ? "" : props.heading}
      </h5>
      {
       printEducation(props.educationInfo)
      }

    </div>
  );

}