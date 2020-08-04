import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import YearMonthPicker from 'react-year-month-picker';
import CustomModal from "../CustomModal";
import moment from 'moment-timezone';

export default function EducationForm(props) {
  console.log(props);
  {/* showAddModal and showEditModal become showModal, initialize as '' and setShowModal will toggle between "ADD"
    and "EDIT"
    setShowAddModal(true) => setShowModal('ADD')
*/}
  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal conatins the id of the selected skill to be editted
  const [showEditModal, setShowEditModal] = useState(false);
  const [educations, setEducations] = useState(props.data || []);
  const [educationDetails, setEducationDetails] = useState({ INSTITUTION: '', FIELDOFSTUDY: '', TYPEOFDEGREE: '', CGPA: '', STARTDATE: '', ENDDATE: '', checked: false });
  const [editEducation, setEditEducation] = useState({});

  console.log(educations);
  const onHeadingChange = (event) => {
    const newEducations = { ...educations, heading: event.target.value }
    setEducations([...educations, newEducations]);
    props.onUpdate({ educations: newEducations });
  }

  const handleEditShow = (INSTITUTION, id, FIELDOFSTUDY, TYPEOFDEGREE, CGPA, STARTDATE, ENDDATE) => {
    setShowEditModal(true);
    setEducationDetails(INSTITUTION, id, FIELDOFSTUDY, TYPEOFDEGREE, CGPA, STARTDATE, ENDDATE)
  };

  const onEdValChange = (event) => {
    const name = event.target.id;
    const newEducationToBeAdded = { ...educationDetails, [name]: event.target.value }
    setEducationDetails(newEducationToBeAdded);
  }
  /*
    const onEdValChange = (event) => {
      const updatedVal = event.target.id;
      console.log('UPDATED VALUE', updatedVal, event.target.value);
      setEducationDetails({ ...educationDetails, [updatedVal]: event.target.value })
      console.log("EDUCATION DETAILS", educationDetails)
      // setEducations([...educations, educationDetails])
      // console.log("EDUCATIONS", educations)
      // props.onUpdate(educations);
    }
    */

  const handleDateChange = (m, source) => {
    console.log(m);
    //const educationField =  event.target.id;
    const month = (m.format('MMM'));
    const year = (m.format('YYYY'));
    console.log(month, year, source);
    setEducationDetails({ ...educationDetails, [source]: `${month} ${year}` })
  }
  const handleSubmit = () => {
    const newEducation =
    {
      id: educations.length + 1,
      INSTITUTION: educationDetails.INSTITUTION,
      FIELDOFSTUDY: educationDetails.FIELDOFSTUDY,
      TYPEOFDEGREE: educationDetails.TYPEOFDEGREE,
      CGPA: educationDetails.CGPA,
      STARTDATE: educationDetails.STARTDATE,
      ENDDATE: educationDetails.ENDDATE,
      checked: educationDetails.checked
    };
    setEducations([...educations, newEducation]);
    setShowAddModal(false);
    props.onUpdate(educations);
  }

  const editItem = (itemID) => {
    setShowEditModal(false);
    props.onUpdate(educations);
  }
  const deleteItem = (id) => {
    const remainingEducations = educations.filter(item => id !== item.id);
    setEducations([...educations, remainingEducations]);
    props.onUpdate(remainingEducations);
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
              value={(educations == null) ? "" : educations.heading} onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        educations.map(item => {
          let cardText;
          if (educationDetails.checked) {
            cardText = (
              `${item.STARTDATE} - In Progress `

            )
          } else {
            cardText = (
              `${item.STARTDATE} -  ${item.ENDDATE} `
            )
          }
          return (
            <Card border="primary" style={{ width: '30rem', margin: '.5rem' }}>
              <Card.Body>
                <Card.Text>
                  {item.INSTITUTION}
                </Card.Text>
                <Card.Text>
                  {item.FIELDOFSTUDY}
                </Card.Text>
                <Card.Text>
                  {item.TYPEOFDEGREE} - {item.CGPA}
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
                  onClick={() =>
                    handleEditShow(item.INSTITUTION, item.id, item.FIELDOFSTUDY, item.TYPEOFDEGREE, item.CGPA, item.STARTDATE, item.ENDDATE)
                  }
                >
                  EDIT
                  </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() =>
                    deleteItem(item.id)
                  }
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
        onSubmit={handleSubmit}
      >
        {/* show === 'ADD' ? show the add body of the form : show the edit body of the form
          save SHOW to state; SHOW will be updated to ADD or EDIT on CLICK
          onClose={() => setShowModal('')}
      */}
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="INSTITUTION">
              <Form.Label>INSTITUTION</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="Enter Institution"
                value={educationDetails.INSTITUTION || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="FIELDOFSTUDY">
              <Form.Label>FIELD OF STUDY</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Field of Study"
                value={educationDetails.FIELDOFSTUDY || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="TYPEOFDEGREE">
              <Form.Label>TYPE OF DEGREE</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Type of Degree"
                value={educationDetails.TYPEOFDEGREE || ''}
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
            <Form.Group as={Col} xs={6} controlId="STARTDATE">
              <Form.Label>START DATE</Form.Label>
              <YearMonthPicker
                defaultYear={2020}
                defaultMonth={1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleDateChange(m, 'STARTDATE')}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="ENDDATE">
              <Form.Label>END DATE</Form.Label>
              <YearMonthPicker
                defaultYear={2020}
                defaultMonth={1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleDateChange(m, 'ENDDATE')}
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
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={() => editItem(educationDetails.id)}
      >
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="INSTITUTION">
              <Form.Label>INSTITUTION</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="Enter Institution"
                value={educationDetails.INSTITUTION || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="FIELDOFSTUDY">
              <Form.Label>FIELD OF STUDY</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Field of Study"
                value={educationDetails.FIELDOFSTUDY || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="TYPEOFDEGREE">
              <Form.Label>TYPE OF DEGREE</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Type of Degree"
                value={educationDetails.TYPEOFDEGREE || ''}
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
            <Form.Group as={Col} xs={6} controlId="STARTDATE">
              <Form.Label>START DATE</Form.Label>
              <YearMonthPicker
                defaultYear={2020}
                defaultMonth={1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleDateChange(m, 'STARTDATE')}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="ENDDATE">
              <Form.Label>END DATE</Form.Label>
              <YearMonthPicker
                defaultYear={2020}
                defaultMonth={1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleDateChange(m, 'ENDDATE')}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </CustomModal >
    </>
  );
};