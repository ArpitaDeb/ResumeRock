import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormContainer from "./FormContainer";
import SummaryForm from "./forms/SummaryForm";
import Navigationbar from "../components/Navigationbar";
import './ResumeBuilder.css';

export default function ResumeBuilder(props) {
  return (
    <>
      <Navigationbar />
      <Row className="rb-container vh-100">
        <Col className="bg-warning col-2">
        </Col>

        <Col className="bg-white gcol-5">
          <FormContainer title="Summary">
            <SummaryForm data={{ heading: "Summary", body: "Experienced customer relationship professional offering demonstrated knowledge gained in telecommunications, finance, and retail services. Goal is to leverage work experience and strong background in customer service to enable effective operations for the company. Highly effective in developing rapport and building relationships with internal and external stakeholders." }} onUpdate={console.log("HEY")} />
          </FormContainer>
        </Col>

        <Col className="bg-light col-5">
        </Col>
      </Row>
    </>
  );

}