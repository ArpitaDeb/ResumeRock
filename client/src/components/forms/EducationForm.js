import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomModal from "../CustomModal";

export default function EducationForm(props) {

  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal conatins the id of the selected skill to be editted
  const [showEditModal, setShowEditModal] = useState(false);
  const [educations, setEducations] = useState(props.data || { educationInfo: [] });
  const [educationDetails, setEducationDetails] = useState({ institution: '', fieldOfStudy: '', typeOfDegree: '', CGPA: '', startDate: '', endDate: '', InProgress: false });
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
    const months = {
      Jan: "1",
      Feb: "2",
      Mar: "3",
      Apr: "4",
      May: "5",
      Jun: "6",
      Jul: "7",
      Aug: "8",
      Sep: "9",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };
    const toMonth = (end === "" ? "InProgress" : Object.keys(months).find(key => months[key] === (end.getMonth() + 1).toString()));
    const fromMonth = Object.keys(months).find(key => months[key] === (start.getMonth() + 1).toString());

    return (toMonth === "InProgress" ? (`${fromMonth} ${start.getFullYear()} - ${toMonth}`) : (`${fromMonth} ${start.getFullYear()} - ${toMonth} ${end.getFullYear()}`));
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
    setEducationDetails({ institution: '', fieldOfStudy: '', typeOfDegree: '', CGPA: '', startDate: '', endDate: '', checked: false });
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
    setEducationDetails({ ...educationDetails, InProgress: true, endDate: "" });
  }
  const editcheckboxHandler = () => {
    const editedEduInfo = { ...editEducation, InProgress: !editEducation.InProgress, endDate: "" };
    setEditEducation(editedEduInfo);
  }
  return (
    <>
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
            <Card border="primary" style={{ width: '30rem', margin: '.5rem' }}>
              <Card.Body>
                <Card.Text>
                  {item.institution}
                </Card.Text>
                <Card.Text>
                  {item.fieldOfStudy}
                </Card.Text>
                <Card.Text>
                  {item.typeOfDegree}  {item.CGPA}
                </Card.Text>
                <Card.Text>
                  {showDateFromTo(item.startDate, item.endDate)}
                </Card.Text>
              </Card.Body>
              <div style={{ position: 'absolute', right: 0, bottom: '2px' }}>
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
                  variant="danger"
                  type="button"
                  onClick={() =>
                    deleteEdInfo(index)}
                >
                  DELETE
                    </Button>
              </div>
            </Card>
          )
        }
        )}
      <Button type="button" variant='primary'
        onClick={() => setShowAddModal(true)}
        size='lg'>+ ADD Education</Button>
      <CustomModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={() => validate(educationDetails)}
      >

        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="institution">
              <Form.Label>Institution</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="Enter Institution"
                value={educationDetails.institution || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="fieldOfStudy">
              <Form.Label>FIELD OF STUDY</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Field of Study"
                value={educationDetails.fieldOfStudy || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="typeOfDegree">
              <Form.Label>TYPE OF DEGREE</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Type of Degree"
                value={educationDetails.typeOfDegree || ''}
                onChange={onEdValChange} />
            </Form.Group>
            <Form.Group as={Col} xs={4} controlId="CGPA">
              <Form.Label>CGPA</Form.Label>
              <Form.Control size="lg" type="text"
                placeholder="Enter CGPA"
                value={educationDetails.CGPA || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="startDate">
              <Form.Label>START DATE</Form.Label>
              <DatePicker className={"form-control"}
                selected={educationDetails.startDate}
                onChange={(startDate) => onEdValChange({ target: { id: 'startDate', value: startDate } })}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="endDate">
              <Form.Label>END DATE</Form.Label>
              <DatePicker className={"form-control"} disabled={educationDetails.InProgress} selected={educationDetails.endDate}
                onChange={(endDate) => onEdValChange({ target: { id: 'endDate', value: endDate } })}
              />
            </Form.Group>
          </Form.Row>
          <Col xs="auto" style={{ position: 'absolute', right: '8rem', bottom: '5px' }}>
            <Form.Check
              type="checkbox"
              id="autoSizingCheck"
              className="my-1"
              label="In Progress "
              checked={educationDetails.InProgress}
              onChange={checkboxHandler}
            />
          </Col>
        </Form>
      </CustomModal>
      <CustomModal
        title="Edit Educations"
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={() => submitEdittedEduInfo(editEducation)}
      >
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="institution">
              <Form.Label>Institution</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="Enter Institution"
                value={editEducation.institution || ''}
                onChange={handleEditEduInfoChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="fieldOfStudy">
              <Form.Label>FIELD OF STUDY</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Field of Study"
                value={editEducation.fieldOfStudy || ''}
                onChange={handleEditEduInfoChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="typeOfDegree">
              <Form.Label>TYPE OF DEGREE</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Type of Degree"
                value={editEducation.typeOfDegree || ''}
                onChange={handleEditEduInfoChange} />
            </Form.Group>
            <Form.Group as={Col} xs={4} controlId="CGPA">
              <Form.Label>CGPA</Form.Label>
              <Form.Control size="lg" type="text"
                placeholder="Enter CGPA"
                value={editEducation.CGPA || ''}
                onChange={handleEditEduInfoChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="startDate">
              <Form.Label>START DATE</Form.Label>
              <DatePicker selected={editEducation.startDate}
                onChange={(startDate) => handleEditEduInfoChange({ target: { id: 'startDate', value: startDate } })}
                value={editEducation.startDate}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="endDate">
              <Form.Label>END DATE</Form.Label>
              <DatePicker disabled={editEducation.InProgress}
                selected={editEducation.endDate}
                onChange={(endDate) => handleEditEduInfoChange({ target: { id: 'endDate', value: endDate } })}
                value={editEducation.endDate}
              />
            </Form.Group>
            <Col xs="auto" style={{ position: 'absolute', right: '8rem', bottom: '5px' }}>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="my-1"
                label="In Progress"
                checked={editEducation.InProgress}
                onChange={editcheckboxHandler}
              />
            </Col>
          </Form.Row>
        </Form>
      </CustomModal >
    </>
  );
};