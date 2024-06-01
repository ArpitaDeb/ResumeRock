import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormContainer from "./FormContainer";
import SummaryForm from "./forms/SummaryForm";
import axios from "axios";
import LeftSideBar from "../components/LeftSidebar/LeftSidebar";
import './ResumeBuilder.css';
import PersonalInfoForm from "./forms/PersonalInfoForm";
import CoreCompetencyForm from "./forms/CoreCompetencyForm"
import EducationForm from "./forms/EducationForm"
import CustomerServiceTemplate from "./templates/customerService/CustomerServiceTemplate"
import Experience from "./forms/Experience"
import ReferenceForm from "./forms/ReferenceForm"
import Preview from "./preview";
import { debounce } from "lodash";
import initialResumeData from "./InitialResumeData"

const baseURL = process.env.REACT_APP_API_URL;
export default function ResumeBuilder(props) {

  const [selectedSection, setSelectedSection] = useState('personal_info');
  const [resumeData, setResumeData] = useState(initialResumeData);
  const sendData = useCallback((newData) => {
    axios.post( `${baseURL}/resume`, { resumeData: newData })
      .then(() => {
        console.log("Sent data successfully!");
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const debouncedSendData = debounce((newData) => {
      sendData(newData);
    }, 1000);

    debouncedSendData(resumeData);

    // Cleanup function to cancel any pending debounced calls on unmount
    return () => {
      debouncedSendData.cancel();
    };
  }, [resumeData, sendData]);

  const resumeDataOnUpdate = (data) => {
    setResumeData((prevData) => ({ ...prevData, ...data }));
  }

  //Get the resume data
  useEffect(() => {
    axios.get( `${baseURL}/resume`).then(response => {
      setResumeData(response.data[0] ? response.data[0].resumedata : initialResumeData)
    });
  }, []);

  const leftSideBarOnUpdate = (value) => {
    setSelectedSection(value);
  }


  const sections = [
    { id: "personal_info", title: "Personal Information", component: <PersonalInfoForm onUpdate={resumeDataOnUpdate} data={resumeData.personal_info} /> },
    { id: "summary", title: "Summary", component: <SummaryForm onUpdate={resumeDataOnUpdate} data={resumeData.summary} /> },
    { id: "educations", title: "Education", component: <EducationForm onUpdate={resumeDataOnUpdate} data={resumeData.educations} /> },
    { id: "core_competencies", title: "Core Competencies", component: <CoreCompetencyForm onUpdate={resumeDataOnUpdate} data={resumeData.core_competencies} /> },
    { id: "experience", title: "Experience", component: <Experience onUpdate={resumeDataOnUpdate} data={resumeData.experience} /> },
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
      <Container fluid className="non-printable">
        <Row className="rb-container vh-100 ">
          <Col className="sidebar-container col-2 vh-100">
            <LeftSideBar items={sections} onUpdate={leftSideBarOnUpdate} />
          </Col>

          <Col className="bg-white col-5 vh-100">
            <FormContainer title={findTitleByID(selectedSection)}>
              {findComponentByID(selectedSection)}
            </FormContainer>
          </Col>

          <Col className="col-5 preview-container vh-100">
            <Preview onUpdate={resumeDataOnUpdate} data={resumeData} />
          </Col>
        </Row>
      </Container>

      <div className="print-preview overlay-white">
        <CustomerServiceTemplate data={resumeData} noScale />
      </div>
    </>
  );
}