import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import MyModalComponent from "../MyModalComponent";
import ReactStars from 'react-stars'

export default function CoreCompetencyForm(props) {
  const ratingMap = {
    1: "Beginner",
    2: "Basic",
    3: "Intermediate",
    4: "Advanced",
    5: "Expert"
  }
  const [state, setState] = useState({
    heading: props.heading || '',
    show: false,
    editShow: false,
    editName: '',
    editId: '',
    title: '',
    body: '',
    rating: 1,
    skills: props.skills || []
  });
  window.state = state;
  window.setState = setState;
  const setShow = () => setState({ ...state, show: true, editName: '', title: 'Name' });
  const handleShow = () => { setShow(true) };
  const handleClose = (fromModal) => {
    alert(fromModal.msg);
    setState({ ...state, show: false, editShow: false });
  };
  const setEditShow = (name, id, rating) => setState({ ...state, editShow: true, editName: name, editId: id, rating: ratingMap[rating], title: 'Name' });
  const handleEditShow = (name, id, rating) => {
    setEditShow(name, id, rating)
  };

  const ratingChanged = (newRating) => {
    setState({ ...state, rating: ratingMap[newRating] })
  }

  const onHeadingChange = (event) => {
    setState({ ...state, heading: event.target.value });
    props.onHeadingChange(event.target.value);
  }
  const onSkillNameChange = (event) => {
    setState({ ...state, editName: event.target.value })
  }
  const handleSubmit = (fromModal) => {
    alert(fromModal.msg);
    const newSkills = [...state.skills, { id: state.skills.length + 1, name: state.editName, rating: state.rating }];
    setState({ ...state, skills: newSkills, show: false });
    props.onSkillChange(newSkills);
  }

  const editItem = () => {
    const editedSkills = state.skills.map(item => {
      if (state.editId === item.id) {
        item.name = state.editName;
        item.rating = state.rating;
      }
      return item;
    });
    setState({ ...state, skills: editedSkills, editShow: false });
    props.onSkillChange(editedSkills);
  }
  const deleteItem = (id) => {
    const remainingSkills = state.skills.filter(item => id !== item.id);
    setState({ ...state, skills: remainingSkills });
    props.onSkillChange(remainingSkills);
  }
  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>YOUR SKILLS-SHOW US WHAT YOU GOT!</Alert.Heading>
        <p>
          HIGHLIGHT YOUR PROFICIENCY WITH DIFFERENT SKILLS,
          PLATFORMS, AND TECHNOLOGIES THAT THE COMPANY IS ASKING
          FOR IN THE JOB DESCRIPTION. THIS WILL HELP BOOST YOUR
          CHANCES OF BEATING THE RESUME SCANNING ROBOTS AS WELL
          AS INCREASING RELEVANCE WITH ANYONE READING YOUR RESUME
        </p>
      </Alert>
      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. Core Competencies, Skills, Expertise"
              value={state.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        state.skills.map(item => {
          return (
            <Card border="primary" style={{ width: '18rem', margin: '.5rem' }}>
              <Card.Body>
                <Card.Text>
                  {item.name}
                </Card.Text>
                <Card.Text>
                  {item.rating}
                </Card.Text>
                <Button variant="primary" type="button"
                  onClick={() => handleEditShow(item.name, item.id)}>Edit</Button>
                <Button variant="primary" type="button"
                  onClick={() => deleteItem(item.id)}>Delete</Button>
              </Card.Body>
            </Card>
          )
        }
        )}
      <Button type="button" variant='primary'
        onClick={handleShow} size='lg'>+ ADD SKILL</Button>
      <MyModalComponent
        title={state.title}
        show={state.show}
        onClick={handleClose}
        onHide={handleClose}
        onSubmit={handleSubmit}
      >
        <Form>
          <Form.Row>
            <Form.Group controlId="skill">
              <Form.Label>Add Skill</Form.Label>
              <Form.Control size="md" type="text" required
                placeholder="Enter Skills/Expertise"
                value={state.editName}
                onChange={onSkillNameChange} />
            </Form.Group>
            <Form.Group controlId="Rating">
              <Form.Label>Rating</Form.Label>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'} />
            </Form.Group>
          </Form.Row>
        </Form>
      </MyModalComponent>

      <MyModalComponent
        title={state.title}
        show={state.editShow}
        onClick={handleClose}
        onHide={handleClose}
        onSubmit={editItem}
      >
        <Form>
          <Form.Row>
            <Form.Group controlId="skill">
              <Form.Label>Edit Skill</Form.Label>
              <Form.Control size="lg" type="text" required
                value={state.editName}
                onChange={onSkillNameChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="Rating">
              <Form.Label>Rating</Form.Label>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'} />
            </Form.Group>
          </Form.Row>
        </Form>
      </MyModalComponent >
    </>
  );
};