import React from "react";
import "./customerServiceStyle.css";
import CoreCompetenciesSection from "./CoreCompetenciesSection";
import EducationSection from "./EducationSection";
import ReferenceSection from "./ReferenceSection";
import ContactsSection from "./ContactsSection";
import TitleSection from "./TitleSection";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection"

export default function CustomerServiceTemplate(props) {
  const data = props.data;
  return (

    <div className="container-fluid row main-container">

      <div className="col-4 borderd d-flex flex-column justify-content-around no-padding">
        <div className="left-container">
          <CoreCompetenciesSection heading={ data.core_competencies? data.core_competencies.heading : undefined} skills={data.core_competencies.skills} />
          <EducationSection heading={data.educations.heading} educationInfo={data.educations.educationInfo} />
          <ReferenceSection heading={data.references.heading} referees={data.references.referees} />
          <ContactsSection personal_info={data.personal_info.personal_info} />
        </div>

      </div>

      <div className="col-8 no-padding right-container">
        <div className="title">
          <TitleSection personal_info={data.personal_info.personal_info} />
        </div>
        <div className="p-3 right-content" >
          <SummarySection heading={data.summary.heading} body={data.summary.body} />
          <ExperienceSection heading={data.experience.heading} experiences={data.experience.experiences} />
        </div>
      </div>

    </div>
  );
}