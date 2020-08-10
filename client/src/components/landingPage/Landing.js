import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import sample1 from "../../img/sample1.png";
import sample2 from "../../img/Sample2.png";
import sample3 from "../../img/Sample3.png";
import "./landing.css"
import ResumeBuilder from "../ResumeBuilder";

export default function Landing(props) {


  return (
    <div className="landing-container">
      <div className="background" />

      <Container className="py-lg-md d-flex pt-5 top-section">
        <div className="col">
          <Row>
            <Col lg="6">
              <h1 className="display-3 text-white">
                Build a resume that gets you hired!{" "}
              </h1>
              <p className="lead text-white">
                Land your ideal job with a professional resume that highlights your skills and experience.
                      </p>
              <div className="btn-wrapper">
                <Link to="/resume" className="btn1 btn-info">Build your resume!</Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Container className="template-container">
        <Row className="row-grid justify-content-between">
          <Col lg="3">
            <Card className="card-lift--hover shadow border-0 box">
              <CardBody>
                <img className={"resumeTemplates"} src={sample1} />
                <div className="text-center">
                  <div className="btn-wrapper">
                    <Link to="/resume" className="template-btn" style={{
                      backgroundColor: "#ffc107"
                    }}>Select template 1</Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-lift--hover shadow border-0">
              <CardBody>
                <img className={"resumeTemplates"} src={sample2} />
                <div className="text-center">
                  <div className="btn-wrapper">
                    <Link to="/resume" className="template-btn"
                    style={{
                      backgroundColor: "#007bff"
                    }}
                    >Select template 2</Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-lift--hover shadow border-0">
              <CardBody>
                <img className={"resumeTemplates"} src={sample3} />
                <div className="text-center">
                  <div className="btn-wrapper">
                    <Link to="/resume" className="template-btn">Select template 3</Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div >
  )
}