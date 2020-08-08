import React from "react";
import "./style.css"



export default function ExperienceSection(props) {

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

  const Spacer = () => <span className="ml-1 mr-1">&#8226;</span>
  const Dimond = () => <span className="ml-1 mr-1">&#9830;</span>

  function printExperiences(exps) {
    if (exps === undefined) {
      return "";
    } else {
      const res = exps.map((item, index) => {
        return (
          <div className="mb-4">
            <div>
              <span className="bold">{item.job_title}</span>
              <Spacer />
              <span>{item.employer_name}</span>
              <Spacer />
              <span>{item.city}, {item.country}</span>
              <Spacer />
              <span className="cs-job-date">{showDateFromTo(item.start_date, item.end_date)}</span>
            </div>
            <div>
              {item.employer_description}
            </div>

            <div className="ml-4">
              <div className="bold-italic mt-2">Responsibilities:</div>
              {
                item.responsibilities.map((res) => {
                  return (
                    <div>
                      <Dimond />{res}
                    </div>
                  )
                })
              }
            </div>

            <div className="ml-4">
              <div className="bold-italic mt-2">Achievements:</div>
              {
                item.achievements.map((res) => {
                  return (
                    <div>
                      <Dimond />{res}
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      })
      return res;
    }
  }

  return (
    <>
      <div>
        <h4 className="text-uppercase bold mb-2">
          {props.heading === undefined ? "" : props.heading}
        </h4>
        {
          printExperiences(props.experiences)
        }
      </div>
    </>
  );

}