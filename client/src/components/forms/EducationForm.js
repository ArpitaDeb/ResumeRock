import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomModal from "../CustomModal";
import Alert from 'react-bootstrap/Alert';

export default function EducationForm(props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [educations, setEducations] = useState(props.data || { educationInfo: [] });
  const [educationDetails, setEducationDetails] = useState({ institution: '', fieldOfStudy: '', typeOfDegree: '', GPA: '', start_date: '', end_date: '', in_progress: false });
  const [editEducation, setEditEducation] = useState({});

  const onHeadingChange = (event) => {
    const newEduHead = { ...educations, heading: event.target.value }
    setEducations(newEduHead);
    props.onUpdate({ educations: newEduHead });
  }

  const onEdValChange = (event) => {
    const name = event.target.id;
    const newEducationToBeAdded = { ...educationDetails, [name]: event.target.value }
    setEducationDetails(newEducationToBeAdded);
  }
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

  function validate() {
    if (!educationDetails.institution) {
      return;
    }
    if (!educationDetails.fieldOfStudy) {
      return;
    }
    if (!educationDetails.typeOfDegree) {
      return;
    }
    submitNewEdInfo(educationDetails);
  }
  const submitNewEdInfo = (EdInfo) => {
    const totalEdInfo = [...educations.educationInfo, EdInfo]
    const newtotalEdInfo = { ...educations, educationInfo: totalEdInfo };
    setEducations(newtotalEdInfo);
    props.onUpdate({ educations: newtotalEdInfo });
    setShowAddModal(false);
    setEducationDetails({ institution: '', fieldOfStudy: '', typeOfDegree: '', GPA: '', start_date: '', end_date: '', checked: false });
  }
  const handleEditEduInfoChange = (event) => {
    const name = event.target.id;
    const editedEduInfo = { ...editEducation, [name]: event.target.value }
    setEditEducation(editedEduInfo);
  }

  const submitEdittedEduInfo = (EdInfo) => {
    const totalEdInfo = [...educations.educationInfo];
    totalEdInfo[showEditModal - 1] = EdInfo;
    const newTotalEdInfo = { ...educations, educationInfo: totalEdInfo };
    setEducations(newTotalEdInfo);
    props.onUpdate({ educations: newTotalEdInfo });
    setShowEditModal(false);
  }
  const deleteEdInfo = (index) => {
    const totalEdInfo = [...educations.educationInfo];
    totalEdInfo.splice(index, 1);
    const remainingEducations = { ...educations, educationInfo: totalEdInfo }
    setEducations(remainingEducations);
    props.onUpdate({ educations: remainingEducations });
  }
  const checkboxHandler = () => {
    const newEdInfo = { ...educationDetails, in_progress: !educationDetails.in_progress, end_date: "" }
    setEducationDetails(newEdInfo);
  }
  const editcheckboxHandler = () => {
    const editedEduInfo = { ...editEducation, in_progress: !editEducation.in_progress, end_date: "" };
    setEditEducation(editedEduInfo);
  }
  return (
    <>
      <Alert variant="primary">
        <Alert.Heading> Writing education in resume is mandatory!</Alert.Heading>
        <p>
        Share the degrees you’ve earned and schools you’ve attended. 
        Remember, learning doesn’t stop when you graduate.
        This is a great place to add in any courses you’ve taken or certifications you’ve earned in the professional world as well!
        </p>
      </Alert>

      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. Educational Qualifications, Education"
              value={(educations == null) ? "" : educations.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        educations.educationInfo.map((item, index) => {
          return (
            <Card border="primary" style={{ width: '28rem', margin: '.3rem' }}>
              <Card.Body>
                <Card.Title>{item.institution}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {showDateFromTo(item.start_date, item.end_date)}
                </Card.Subtitle>
                <Card.Text>
                  {item.typeOfDegree} - {item.fieldOfStudy}
                </Card.Text>
                <div>
                  <Button
                    variant="primary"
                    type="button"
                    style={{ margin: '.2rem' }}
                    onClick={() => {
                      setShowEditModal(index + 1)
                      setEditEducation(item)
                    }
                    }>
                    EDIT
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() =>
                      deleteEdInfo(index)}
                  >
                    DELETE
                    </Button>
                </div>
              </Card.Body>
            </Card>
          )
        }
        )}
      <Button type="button" variant='primary'
        onClick={() => setShowAddModal(true)}
        size='md'>+ ADD Education</Button>
      <CustomModal
        title="Add Education"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={() => validate(educationDetails)}
      >

        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="institution">
              <Form.Label>Institution</Form.Label>
              <Form.Control size="md" type="text" required
                value={educationDetails.institution}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="fieldOfStudy">
              <Form.Label>Field of Study</Form.Label>
              <Form.Control size="md" type="text" required
                value={educationDetails.fieldOfStudy}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="typeOfDegree">
              <Form.Label>Type of Degree</Form.Label>
              <Form.Control size="md" type="text" required
                value={educationDetails.typeOfDegree}
                onChange={onEdValChange} />
            </Form.Group>
            <Form.Group as={Col} xs={4} controlId="GPA">
              <Form.Label>GPA</Form.Label>
              <Form.Control size="md" type="text"
                value={educationDetails.GPA}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                size="md"
                type="text"
                required
                onChange={onEdValChange}
                value={educationDetails.city}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                size="md"
                type="text"
                required
                onChange={onEdValChange}
                value={educationDetails.country}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <DatePicker className={"form-control"}
                selected={educationDetails.start_date}
                onChange={(start_date) => onEdValChange({ target: { id: 'start_date', value: start_date } })}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="end_date">
              <Form.Label>End Date</Form.Label>
              <DatePicker className={"form-control"} disabled={educationDetails.in_progress} selected={educationDetails.end_date}
                onChange={(end_date) => onEdValChange({ target: { id: 'end_date', value: end_date } })}
              />
            </Form.Group>
          </Form.Row>
          <Col xs="auto" style={{ position: 'absolute', right: '8rem', bottom: '5px' }}>
            <Form.Check
              type="checkbox"
              id="autoSizingCheck"
              className="my-1"
              label="In Progress "
              checked={educationDetails.in_progress}
              onChange={checkboxHandler}
            />
          </Col>
        </Form>
      </CustomModal>
      <CustomModal
        title="Edit Education"
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={() => submitEdittedEduInfo(editEducation)}
      >
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="institution">
              <Form.Label>Institution</Form.Label>
              <Form.Control size="md" type="text" required placeholder="Enter Institution"
                value={editEducation.institution}
                onChange={handleEditEduInfoChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="fieldOfStudy">
              <Form.Label>Field of Study</Form.Label>
              <Form.Control size="md" type="text" required
                placeholder="Enter Field of Study"
                value={editEducation.fieldOfStudy}
                onChange={handleEditEduInfoChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="typeOfDegree">
              <Form.Label>Type of Degree</Form.Label>
              <Form.Control size="md" type="text" required
                value={editEducation.typeOfDegree}
                onChange={handleEditEduInfoChange} />
            </Form.Group>
            <Form.Group as={Col} xs={4} controlId="GPA">
              <Form.Label>GPA</Form.Label>
              <Form.Control size="md" type="text"
                value={editEducation.GPA}
                onChange={handleEditEduInfoChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <DatePicker selected={editEducation.start_date}
                onChange={(start_date) => handleEditEduInfoChange({ target: { id: 'start_date', value: start_date } })}
                value={editEducation.start_date}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="end_date">
              <Form.Label>End Date</Form.Label>
              <DatePicker disabled={editEducation.in_progress}
                selected={editEducation.end_date}
                onChange={(end_date) => handleEditEduInfoChange({ target: { id: 'end_date', value: end_date } })}
                value={editEducation.end_date}
              />
            </Form.Group>
            <Col xs="auto" style={{ position: 'absolute', right: '8rem', bottom: '5px' }}>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="my-1"
                label="In Progress"
                checked={editEducation.in_progress}
                onChange={editcheckboxHandler}
              />
            </Col>
          </Form.Row>
        </Form>
      </CustomModal >
    </>
  );
};