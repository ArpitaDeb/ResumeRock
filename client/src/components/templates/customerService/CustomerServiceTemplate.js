import React, { useEffect, useRef, useState } from "react";
import "./customerServiceStyle.css";
import CoreCompetenciesSection from "./CoreCompetenciesSection";
import EducationSection from "./EducationSection";
import ReferenceSection from "./ReferenceSection";
import ContactsSection from "./ContactsSection";
import TitleSection from "./TitleSection";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection"
import { data } from "./data"

export default function CustomerServiceTemplate(props) {
  const pageRef = useRef(null);
  const [ratio, setRatio] = useState()

  const handleResize = () => {
    console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    setRatio(pageRef.current.parentElement.offsetWidth / pageRef.current.offsetWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

// comment line below to check an example of full page resume template!
  const data = props.data;

  if (!Object.keys(data).length) {
    return (<div ref={pageRef} style={{ transform: `scale(${ratio * .8})`, transformOrigin: 'top left', overflow: 'hidden' }} className="container-fluid page"/>);
  }
  return (
    <div ref={pageRef} style={{ transform: `scale(${ratio * .9})`, transformOrigin: 'top left', overflow: 'hidden' }} className="container-fluid page">
      <div className="container-fluid row main-container">

        <div className="col-4 borderd d-flex flex-column justify-content-around no-padding">
          <div className="left-container">
            <CoreCompetenciesSection heading={data.core_competencies ? data.core_competencies.heading : undefined} skills={data.core_competencies ? data.core_competencies.skills : undefined} />
            <EducationSection heading={data.educations ? data.educations.heading : undefined} educationInfo={data.educations ? data.educations.educationInfo : undefined} />
            <ReferenceSection heading={data.references ? data.references.heading : undefined} referees={data.references ? data.references.referees : undefined} />
            <ContactsSection personal_info={data.personal_info ? data.personal_info : undefined} />
          </div>

        </div>

        <div className="col-8 no-padding right-container">
          <div className="title">
            <TitleSection personal_info={data.personal_info ? data.personal_info : undefined} />
          </div>
          <div className="p-3 right-content" >
            <SummarySection heading={data.summary ? data.summary.heading : undefined} body={data.summary ? data.summary.body : undefined} />
            <ExperienceSection heading={data.experience ? data.experience.heading : undefined} experiences={data.experience ? data.experience.experiences : undefined} />
          </div>
        </div>

      </div>
    </div>
  );
}