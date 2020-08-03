import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CustomModal from "../CustomModal";
import ReactStars from 'react-stars'

export default function CoreCompetencyForm(props) {
  const ratingMap = {
    1: "Beginner",
    2: "Basic",
    3: "Intermediate",
    4: "Advanced",
    5: "Expert"
  }

  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal conatins the id of the selected skill to be editted
  const [showEditModal, setShowEditModal] = useState();
  const [coreCompetencies, setCoreCompetencies] = useState(props.data || { skills: [] });
  const [newSkill, setNewSkill] = useState({ name: "", rating: 1 });
  const [editSkill, setEditSkill] = useState({});

  const onHeadingChange = (event) => {
    const newCoreCompetencies = { ...coreCompetencies, heading: event.target.value }
    setCoreCompetencies(newCoreCompetencies);
    props.onUpdate({ core_competencies: newCoreCompetencies });
  }

  const handleNewSkillChange = (event) => {
    const name = event.target.id;
    const newSkillToBeAdded = { ...newSkill, [name]: event.target.value }
    setNewSkill(newSkillToBeAdded);
  }

  const saveNewSkill = (skill) => {
    const allSkills = [...coreCompetencies.skills, skill]
    const newCoreCompetencies = { ...coreCompetencies, skills: allSkills };
    setCoreCompetencies(newCoreCompetencies);
    props.onUpdate({ core_competencies: newCoreCompetencies });
    setShowAddModal(false);
    setNewSkill({ name: "", rating: 1 })
  }

  const handleEditSkillChange = (event) => {
    const name = event.target.id;
    const changedSkill = { ...editSkill, [name]: event.target.value }
    setEditSkill(changedSkill);
  }

  const saveEdittedSkill = (skill) => {
    const newSkills = [...coreCompetencies.skills];
    newSkills[showEditModal - 1] = skill;
    const newCoreCompetencies = { ...coreCompetencies, skills: newSkills };
    setCoreCompetencies(newCoreCompetencies);
    props.onUpdate({ core_competencies: newCoreCompetencies });
    setShowEditModal(false);
  }


  const deleteSkill = (index) => {
    const newSkills = [...coreCompetencies.skills];
    newSkills.splice(index, 1)
    const newCoreCompetencies = { ...coreCompetencies, skills: newSkills };
    setCoreCompetencies(newCoreCompetencies);
    props.onUpdate({ core_competencies: newCoreCompetencies });
  }

  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>YOUR SKILLS-SHOW US WHAT YOU GOT!</Alert.Heading>
        <p>
          Highlight your proficiency with different skills,
          platforms, and technologies that the company is asking
          for in the job description. This will help boost your
          chances of beating the resume scanning robots as well
          as increasing relevance with anyone reading your resume.
        </p>
      </Alert>
      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. Core Competencies, Skills, Expertise"
              value={(coreCompetencies == null) ? "" : coreCompetencies.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        coreCompetencies.skills.map((item, index) => {
          return (
            <Card border="primary" style={{ width: '20rem', margin: '.5rem' }}>
              <Card.Body>
                <Card.Subtitle>Name:</Card.Subtitle>
                <Card.Text>
                  {item.name}
                </Card.Text>
                <Card.Subtitle>Rating:</Card.Subtitle>
                <Card.Text>
                  {ratingMap[item.rating]}
                </Card.Text>
                <div>
                  <Button variant="primary" type="button" style={{ margin: '.2rem' }}
                    onClick={() => {
                      setShowEditModal(index + 1)
                      setEditSkill(item)
                    }
                    }>Edit</Button>
                  <Button variant="primary" type="button"
                    onClick={() => deleteSkill(index)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          )
        }
        )}

      <Button type="button" variant='primary'
        onClick={() => setShowAddModal(true)} size='lg'>+ ADD SKILL</Button>

      <CustomModal
        title="Add Skill"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={() => saveNewSkill(newSkill)}
      >
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={5} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="md"
                type="text"
                required
                placeholder="Enter Skills/Expertise"
                onChange={handleNewSkillChange}
                value={newSkill.name}
              />
            </Form.Group>
            <Form.Group as={Col} xs={5} controlId="rating">
              <Form.Label>Rating</Form.Label>
              <ReactStars
                count={5}
                size={24}
                color2={'#ffd700'}
                onChange={(rating) => handleNewSkillChange({ target: { id: 'rating', value: rating } })}
                value={newSkill.rating}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </CustomModal>

      <CustomModal
        title="Edit Skill"
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={() => saveEdittedSkill(editSkill)}
      >
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={5} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control size="md" type="text" required
                value={editSkill.name}
                onChange={handleEditSkillChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={5} controlId="rating">
              <Form.Label>Rating</Form.Label>
              <ReactStars
                value={editSkill.rating}
                count={5}
                onChange={(rating) => handleEditSkillChange({ target: { id: 'rating', value: rating } })}
                size={24}
                color2={'#ffd700'} />
            </Form.Group>
          </Form.Row>
        </Form>
      </CustomModal>
    </>
  );
};