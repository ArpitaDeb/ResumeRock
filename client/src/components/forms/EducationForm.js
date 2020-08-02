import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import MyModalComponent from "../MyModalComponent";

export default function EducationForm(props) {
  console.log(props);

  const [state, setState] = useState({
    heading: props.heading || '',
    show: false,
    editShow: false,
    editName: '',
    editId: '',
    checked: false,
    educations: props.educations || []
  });
  window.state = state;
  window.setState = setState;
  const setShow = () => setState({ ...state, show: true, editName: '' });
  const handleShow = () => { setShow(true) };
  const handleClose = (fromModal) => {
    alert(fromModal.msg);
    setState({ ...state, show: false, editShow: false });
  };
  const setEditShow = (name, id) => setState({ ...state, editShow: true, editName: name, editId: id});
  const handleEditShow = (INSTITUTION, id) => { setEditShow(INSTITUTION, id) };

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
  const onSkillNameChange = (event) => {
    setState({ ...state, editName: event.target.value })
  }
  const handleChange = (event) => {
    const updatedVal = event.target.id;
    console.log(updatedVal);
    setState({ ...state, [updatedVal]: event.target.value });
    props.onUpdate(state);
  }
  */

  const handleSubmit = (fromModal) => {
    //console.log('handleSubmit');
    //console.log(fromModal);
    alert(fromModal.msg);
    const neweducations = [...state.educations, { id: state.educations.length + 1, INSTITUTION: state.INSTITUTION, FIELDOFSTUDY: state.FIELDOFSTUDY, TYPEOFDEGREE: state.TYPEOFDEGREE, CGPA: state.CGPA, STARTDATE: state.STARTDATE, ENDDATE: state.ENDDATE }];
    console.log('handlesubmit',neweducations);
    setState({ ...state, educations: neweducations, show: false });
    props.onEducationChange(neweducations);
  }

  const editItem = () => {
    console.log(state);
    const editededucations = state.educations.map(item => {
      if (state.editId === item.id) {
        item.INSTITUTION = state.editName;
      }
      return item;
    });
    setState({ ...state, educations: editededucations, editShow: false });
    props.onEducationChange(editededucations);
  }
  const deleteItem = (id) => {
    const remainingeducations = state.educations.filter(item => id !== item.id);
    setState({ ...state, educations: remainingeducations });
    props.onEducationChange(remainingeducations);
  }
  const checkboxHandler = (event) => {
    setState({ ...state, checked: event.target.checked});
  }
  return (
    <>
      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text" placeholder="E.g. Educational Qualifications, Education" value={state.heading} onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        state.educations.map(item => {
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
                  {item.STARTDATE} - {item.ENDDATE}
                </Card.Text>
              </Card.Body>
              <div style={{ position: 'absolute', right: 0, bottom: '2px' }}>
                <Button variant="primary" type="button" style={{ margin: '.2rem' }} onClick={() => handleEditShow(item.INSTITUTION, item.id)}>EDIT</Button>
                <Button variant="danger" type="button" onClick={() => deleteItem(item.id)}>DELETE</Button>
              </div>
            </Card>
          )
        }
        )}
      <Button type="button" variant='primary' onClick={handleShow} size='lg'>+ ADD Education</Button>
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
              <Form.Control size="lg" type="text" required placeholder="Enter Institution" value={state.INSTITUTION || ''} onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={12} controlId="FIELDOFSTUDY">
              <Form.Label>FIELD OF STUDY</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="Enter Field of Study" value={state.FIELDOFSTUDY || ''} onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="TYPEOFDEGREE">
              <Form.Label>TYPE OF DEGREE</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="Enter Type of Degree" value={state.TYPEOFDEGREE || ''} onChange={onEdValChange} />
            </Form.Group>
            <Form.Group as={Col} xs={4} controlId="CGPA">
              <Form.Label>CGPA</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Enter CGPA" value={state.CGPA || ''} onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={6} controlId="STARTDATE">
              <Form.Label>START DATE</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="Enter Start Date" value={state.STARTDATE || ''} onChange={onEdValChange} />
            </Form.Group>

            <Form.Group as={Col} xs={6} controlId="ENDDATE">
              <Form.Label>END DATE</Form.Label>
              <Form.Control size="lg" type="text" required placeholder="Enter End Date" value={state.ENDDATE || ''} onChange={onEdValChange} />
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
            <Form.Group controlId="Education">
              <Form.Label>Edit Education</Form.Label>
              <Form.Control size="lg" type="text" required value={state.editName} onChange={onEdValChange} />
            </Form.Group>
          </Form.Row>
        </Form>
      </MyModalComponent >
    </>
  );
}; 