import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import YearMonthPicker from 'react-year-month-picker';
import CustomModal from "../CustomModal";
import "./Educationform.css";
import moment from 'moment-timezone';

export default function EducationForm(props) {
  console.log(props);
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
  {/* showAddModal and showEditModal become showModal, initialize as '' and setShowModal will toggle between "ADD"
    and "EDIT"
    setShowAddModal(true) => setShowModal('ADD')
*/}
  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal conatins the id of the selected skill to be editted
  const [showEditModal, setShowEditModal] = useState(false);
  const [educations, setEducations] = useState(props.data || { educationInfo: [] });
  const [educationDetails, setEducationDetails] = useState({ institution: '', fieldOfStudy: '', typeOfDegree: '', CGPA: '', startDate: '', endDate: '', checked: false });
  const [editEducation, setEditEducation] = useState({});

  console.log(educations);
  const onHeadingChange = (event) => {
    const newEduHead = { ...educations, heading: event.target.value }
    setEducations(newEduHead);
    props.onUpdate({ educations: newEduHead });
  }

  const handleEditShow = (institution, id, fieldOfStudy, typeOfDegree, CGPA, startDate, endDate) => {
    setShowEditModal(true);
    setEducationDetails(institution, id, fieldOfStudy, typeOfDegree, CGPA, startDate, endDate)
  };

  const onEdValChange = (event) => {
    const name = event.target.id;
    const newEducationToBeAdded = { ...educationDetails, [name]: event.target.value }
    setEducationDetails(newEducationToBeAdded);
  }

  const handleDateChange = (m, source) => {
    console.log(m);
    //const educationField =  event.target.id;
    const month = (m.format('MMM'));
    const year = (m.format('YYYY'));
    console.log(month, year, source);
    setEducationDetails({ ...educationDetails, [source]: `${month} ${year}` })
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
  const editItem = (itemID) => {
    setShowEditModal(false);
    props.onUpdate(educations);
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
  const checkboxHandler = (event) => {
    setEducationDetails({ ...educationDetails, checked: event.target.checked });
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
          let cardText;
          if (item.checked) {
            cardText = (
              `${item.startDate} - In Progress `

            )
          } else {
            cardText = (
              `${item.startDate} -  ${item.endDate} `
            )
          }
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
                  {item.typeOfDegree} - {item.CGPA}
                </Card.Text>
                <Card.Text>
                  {cardText}
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
        {/* show === 'ADD' ? show the add body of the form : show the edit body of the form
          save SHOW to state; SHOW will be updated to ADD or EDIT on CLICK
          onClose={() => setShowModal('')}
      */}
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
              <YearMonthPicker
                defaultYear={2020}
                defaultMonth={1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleDateChange(m, 'startDate')}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="endDate">
              <Form.Label>END DATE</Form.Label>
              <YearMonthPicker
                defaultYear={2020}
                defaultMonth={1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleDateChange(m, 'endDate')}
              />
            </Form.Group>
          </Form.Row>
          <Col xs="auto" style={{ position: 'absolute', right: '8rem', bottom: '5px' }}>
            <Form.Check
              type="checkbox"
              id="autoSizingCheck"
              className="my-1"
              label="In Progress "
              checked={educationDetails.checked}
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
              <YearMonthPicker
                defaultYear={editEducation.startDate ? editEducation.startDate.substr(editEducation.startDate.length - 4) : 2020}
                defaultMonth={editEducation.startDate ? months[editEducation.startDate.substr(0, 3)] : 1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(startDate) => handleEditEduInfoChange({ target: { id: 'startDate', value: startDate } })}
                value={editEducation.startDate}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="endDate">
              <Form.Label>END DATE</Form.Label>
              <YearMonthPicker
                defaultYear={editEducation.endDate ? editEducation.endDate.substr(editEducation.endDate.length - 4) : 2020}
                defaultMonth={editEducation.endDate ? months[editEducation.endDate.substr(0, 3)] : 1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleDateChange(m, 'endDate')}
              />
            </Form.Group>
            <Col xs="auto" style={{ position: 'absolute', right: '8rem', bottom: '5px' }}>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="my-1"
                label="In Progress "
                checked={educationDetails.checked}
                onChange={checkboxHandler}
              />
            </Col>
          </Form.Row>
        </Form>
      </CustomModal >
    </>
  );
};