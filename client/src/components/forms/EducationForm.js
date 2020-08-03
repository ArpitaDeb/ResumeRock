import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import YearMonthPicker from 'react-year-month-picker';
import MyModalComponent from "../MyModalComponent";
import moment from 'moment-timezone';
//import YearMonthSelector from 'react-year-month-selector';
//import 'react-year-month-selector/dist/react-year-month-selector.css';

export default function EducationForm(props) {
  const [state, setState] = useState({
    heading: props.heading || '',
    show: false,
    editShow: false,
    editId: '',
    editName: '',
    editField: '',
    editDeg: '',
    editGpa: '',
    editStartDate: '',
    editEndDate: '',
    STARTDATE: '',
    ENDDATE: '',
    checked: false,
    scheduled: null,
    educations: props.educations || []
  });
  console.log(state);
  const setShow = () => setState({ ...state, show: true, INSTITUTION: '', FIELDOFSTUDY: '', editDeg: '', editGpa: '', editStartDate: '', editEndDate: '', checked: false });

  const handleShow = () => { setShow(true) };
  const handleClose = (fromModal) => {
    alert(fromModal.msg);
    setState({ ...state, show: false, editShow: false });
  };

  const setEditShow = (INSTITUTION, id, FIELDOFSTUDY, TYPEOFDEGREE, CGPA, STARTDATE, ENDDATE) => setState({ ...state, editShow: true, editName: INSTITUTION, editId: id, editField: FIELDOFSTUDY, editDeg: TYPEOFDEGREE, editGpa: CGPA, editStartDate: STARTDATE, editEndDate: ENDDATE });

  const handleEditShow = (INSTITUTION, id, FIELDOFSTUDY, TYPEOFDEGREE, CGPA, STARTDATE, ENDDATE) => {
    //console.log('handleeditshow', INSTITUTION, id, FIELDOFSTUDY);
    setEditShow(INSTITUTION, id, FIELDOFSTUDY, TYPEOFDEGREE, CGPA, STARTDATE, ENDDATE)
  };

  const onHeadingChange = (event) => {
    setState({ ...state, heading: event.target.value });
    props.onHeadingChange(event.target.value);
  }
  const onEdValChange = (event) => {
    const updatedVal = event.target.id;
    //console.log('onEdValChange', updatedVal, event.target.value);
    setState({ ...state, [updatedVal]: event.target.value })
    //console.log('editName from onEdValChange',  state);
  }
  /*
  const onEditChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    props.onUpdate(state);
  }
 const onEditChange  = (event) => {
  const updatedVal = event.target.id;
  //console.log('onEdValChange', updatedVal, event.target.value);
  setState({ ...state, [updatedVal]: event.target.value })
  //console.log('editName from onEdValChange',  state);
  }

  const onEditChange = (event) => {
    const target = event.target;
    const name = target.name;
    setState({ ...state, [name]: event.target.value })
  }
  const handleChange = (event) => {
    const updatedVal = event.target.id;
    console.log(updatedVal);
    setState({ ...state, [updatedVal]: event.target.value });
    props.onUpdate(state);
  }
   */
  const onEditChange = (event) => {
    setState({ ...state, editName: event.target.value })
  }
  const onEditFieldChange = (event) => {
    setState({ ...state, editField: event.target.value })
  }
  const onEditDegChange = (event) => {
    setState({ ...state, editDeg: event.target.value })
  }
  const onEditGpaChange = (event) => {
    setState({ ...state, editGpa: event.target.value })
  }
  const onEditStartDateChange = (event) => {
    setState({ ...state, editStartDate: event.target.value })
  }
  const onEditEndDateChange = (event) => {
    setState({ ...state, editEndDate: event.target.value })
  }
  const handleEditDateChange = (m, source) => {
    const month = (m.format('MMM'));
    const year = (m.format('YYYY'));
    console.log(month, year, source);
    setState({ ...state, [source]: `${month} ${year}` })
  }

  const handleDateChange = (m, source) => {
    const month = (m.format('MMM'));
    const year = (m.format('YYYY'));
    console.log(month, year, source);
    setState({ ...state, [source]: `${month} ${year}` })
  }
  const handleSubmit = (fromModal) => {
    //console.log('handleSubmit');
    alert(fromModal.msg);
    const newEducations = [...state.educations,
    {
      id: state.educations.length + 1,
      INSTITUTION: state.INSTITUTION,
      FIELDOFSTUDY: state.FIELDOFSTUDY,
      TYPEOFDEGREE: state.TYPEOFDEGREE,
      CGPA: state.CGPA,
      STARTDATE: state.STARTDATE,
      ENDDATE: state.ENDDATE,
      checked: state.checked
    }];
    //console.log('handlesubmit', newEducations);
    setState({ ...state, educations: newEducations, show: false });
    props.onEducationChange(newEducations);
  }

  const editItem = () => {
    //console.log(state);
    const editedEducations = state.educations.map(item => {
      // console.log('edititeminloop', state.editId, 'itemid', item.id);
      if (state.editId === item.id) {
        item.INSTITUTION = state.editName;
        // console.log(state.editName);
        item.FIELDOFSTUDY = state.editField;
        item.TYPEOFDEGREE = state.editDeg;
        item.CGPA = state.editGpa;
        item.STARTDATE = state.editStartDate;
        item.ENDDATE = state.editEndDate;
      }
      return item;
    });
    setState({ ...state, educations: editedEducations, editShow: false });
    props.onEducationChange(editedEducations);
  }
  const deleteItem = (id) => {
    const remainingEducations = state.educations.filter(item => id !== item.id);
    setState({ ...state, educations: remainingEducations });
    props.onEducationChange(remainingEducations);
  }
  const checkboxHandler = (event) => {
    setState({ ...state, checked: event.target.checked });
  }
  return (
    <>
      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. Educational Qualifications, Education"
              value={state.heading} onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        state.educations.map(item => {
          let cardText;
          if (state.checked) {
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
                <Button variant="primary"
                  type="button" style={{ margin: '.2rem' }}
                  onClick={() => handleEditShow(item.INSTITUTION, item.id, item.FIELDOFSTUDY, item.TYPEOFDEGREE, item.CGPA, item.STARTDATE, item.ENDDATE)}>EDIT</Button>
                <Button variant="danger"
                  type="button"
                  onClick={() => deleteItem(item.id)}>DELETE</Button>
              </div>
            </Card>
          )
        }
        )}
      <Button type="button" variant='primary'
        onClick={handleShow}
        size='lg'>+ ADD Education</Button>
      <MyModalComponent
        show={state.show}
        onClick={handleClose}
        onHide={handleClose}
        onSubmit={handleSubmit}
      >
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="INSTITUTION">
              <Form.Label>INSTITUTION</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Institution"
                value={state.INSTITUTION || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="FIELDOFSTUDY">
              <Form.Label>FIELD OF STUDY</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Field of Study"
                value={state.FIELDOFSTUDY || ''}
                onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="TYPEOFDEGREE">
              <Form.Label>TYPE OF DEGREE</Form.Label>
              <Form.Control size="lg" type="text" required
                placeholder="Enter Type of Degree"
                value={state.TYPEOFDEGREE || ''}
                onChange={onEdValChange} />
            </Form.Group>
            <Form.Group as={Col} xs={4} controlId="CGPA">
              <Form.Label>CGPA</Form.Label>
              <Form.Control size="lg" type="text"
                placeholder="Enter CGPA"
                value={state.CGPA || ''}
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
              checked={state.checked}
              onChange={checkboxHandler}
            />
          </Col>
        </Form>
      </MyModalComponent>
      <MyModalComponent
        show={state.editShow}
        onClick={handleClose}
        onHide={handleClose}
        onSubmit={editItem}
      >
        <Form>
          <Form.Row>
            <Form.Group controlId="INSTITUTION">
              <Form.Label>Edit Institution</Form.Label>
              <Form.Control size="lg" type="text" required
                value={state.editName}
                onChange={onEditChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="FIELDOFSTUDY">
              <Form.Label>Edit Field Of Study</Form.Label>
              <Form.Control size="lg" type="text" required
                value={state.editField}
                onChange={onEditFieldChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="TYPEOFDEGREE">
              <Form.Label>Edit Type of Degree</Form.Label>
              <Form.Control size="lg" type="text" required
                value={state.editDeg}
                onChange={onEditDegChange} />
            </Form.Group>
            <Form.Group as={Col} xs={4} controlId="CGPA">
              <Form.Label>Edit CGPA</Form.Label>
              <Form.Control size="lg" type="text"
                value={state.editGpa}
                onChange={onEditGpaChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="STARTDATE">
              <Form.Label>Edit Start Date</Form.Label>
              <YearMonthPicker
                defaultYear={2020}
                defaultMonth={1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleEditDateChange(m, 'editStartDate')}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} controlId="ENDDATE">
              <Form.Label>Edit End Date</Form.Label>
              <YearMonthPicker
                defaultYear={2020}
                defaultMonth={1}
                minYear={1900}
                maxYear={2040}
                closeOnSelect
                onChange={(m) => handleEditDateChange(m, 'editEndDate')}
              />
            </Form.Group>
          </Form.Row>
          <Col xs="auto" style={{ position: 'absolute', right: '8rem', bottom: '5px' }}>
            <Form.Check
              type="checkbox"
              id="autoSizingCheck"
              className="my-1"
              label="In Progress "
              checked={state.checked}
              onChange={checkboxHandler}
            />
          </Col>
        </Form>
      </MyModalComponent >
    </>
  );
};