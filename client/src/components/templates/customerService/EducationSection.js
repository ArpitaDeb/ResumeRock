import React from "react";
import "./style.css"

const showDateFromTo = (start, end) => {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"];
  const toMonth = (end === "" ? "Present" : months[end.getMonth()]);
  const fromMonth = months[start.getMonth()];
  return (toMonth === "Present" ? (`${fromMonth} ${start.getFullYear()} - ${toMonth}`) : (`${fromMonth} ${start.getFullYear()} - ${toMonth} ${end.getFullYear()}`));
}

export default function EducationSection(props) {

  const Dimond = () => <span className="ml-1 mr-1">&#9830;</span>

  return (
    <div>
      <h4 className="text-uppercase mb-4">
        {props.heading}
      </h4>
      {
        props.educationInfo.map(item => {
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
      }

    </div>
  );

}