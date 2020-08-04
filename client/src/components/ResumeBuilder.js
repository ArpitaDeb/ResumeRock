import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormContainer from "./FormContainer";
import SummaryForm from "./forms/SummaryForm";
import Navigationbar from "../components/Navigationbar";
import LeftSideBar from "../components/LeftSidebar/LeftSidebar"
import './ResumeBuilder.css';
import PersonalInfoForm from "./forms/PersonalInfoForm";
import Preview from "./preview/Preview"
import CoreCompetencyForm from "./forms/CoreCompetencyForm"
import ReferenceForm from "./forms/ReferenceForm"

export default function ResumeBuilder(props) {
  const resumeDB = {
  }
  const [selectedSection, setSelectedSection] = useState('personal_info');
  const [resumeData, setResumeData] = useState(resumeDB);

  const resumeDataOnUpdate = (data) => {
    setResumeData({ ...resumeData, ...data });
  }

  const leftSideBarOnUpdate = (value) => {
    console.log("Selected item: ", value);
    setSelectedSection(value);
  }

  const sections = [
    { id: "personal_info", title: "Personal Information", component: <PersonalInfoForm onUpdate={resumeDataOnUpdate} data={resumeData.personal_info}/> },
    { id: "summary", title: "Summary", component: <SummaryForm onUpdate={resumeDataOnUpdate} data={resumeData.summary} /> },
    { id: "education", title: "Education" },
    { id: "core_competencies", title: "Core Competencies", component: <CoreCompetencyForm onUpdate={resumeDataOnUpdate} data={resumeData.core_competencies} /> },
    { id: "experience", title: "Experience" },
    { id: "references", title: "References", component: <ReferenceForm onUpdate={resumeDataOnUpdate} data={resumeData.references} /> }
  ]

  const findTitleByID = (sectionID) => {
    return (sections.find(element => element.id === sectionID)).title
  }

  const findComponentByID = (sectionID) => {
    return (sections.find(element => element.id === sectionID)).component
  }


  return (
    <>
      <Navigationbar />
      <Row className="rb-container vh-100">
        <Col className="bg-warning col-2">
          <LeftSideBar items={sections} onUpdate={leftSideBarOnUpdate} />
        </Col>

        <Col className="bg-white gcol-5">
          <FormContainer title={findTitleByID(selectedSection)}>
            {findComponentByID(selectedSection)}
          </FormContainer>
        </Col>

        <Col className="bg-light col-5">
          <Preview resumeData={resumeData}/>
        </Col>
      </Row>
    </>
  );

}