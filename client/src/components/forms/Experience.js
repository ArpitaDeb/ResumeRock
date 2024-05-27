import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CustomModal from "../CustomModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from 'react-bootstrap/Alert';
import ReactListInput from 'react-list-input';
import { Item, StagingItem } from "../../helpers/reactListInputHelper"
import showDateFromTo from "../../helpers/dateUtils";


export default function Experience(props) {
  const emptyExperience = {
    employer_name: "",
    employer_description: "",
    job_title: "",
    start_date: new Date(),
    end_date: new Date(),
    present: false,
    city: "",
    country: "",
    responsibilities: [],
    achievements: [],
  }

  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal conatins the id of the selected experience to be editted
  const [showEditModal, setShowEditModal] = useState();

  const [experienceData, setExperienceData] = useState({ heading:'',experiences: [] });
  const [newExperience, setNewExperience] = useState(emptyExperience);
  const [editExperience, setEditExperience] = useState({});

  useEffect(() => {
    if (props.data) {
      setExperienceData(props.data)
    }
  }, [props.data])

  const onHeadingChange = (event) => {
    const newExperiece = { ...experienceData, heading: event.target.value }
    setExperienceData(newExperiece);
    props.onUpdate({ experience: newExperiece });
  }

  const saveNewExperience = (ex) => {
    const allExperiences = [...experienceData.experiences, ex];
    const newExperiences = { ...experienceData, experiences: allExperiences };
    setExperienceData(newExperiences);
    props.onUpdate({ experience: newExperiences });
    setShowAddModal(false);
    setNewExperience(emptyExperience);
  }

  const handleNewExperienceChange = (event) => {
    const name = event.target.id;
    const newExperienceToBeAdded = { ...newExperience, [name]: event.target.value }
    setNewExperience(newExperienceToBeAdded);
  }

  const deleteExperience = (index) => {
    const newExperiences = [...experienceData.experiences];
    newExperiences.splice(index, 1)
    const newExperienceData = { ...experienceData, experiences: newExperiences };
    setExperienceData(newExperienceData);
    props.onUpdate({ experience: newExperienceData });
  }

  const handleEditExperienceChange = (event) => {
    const name = event.target.id;
    const changedExperience = { ...editExperience, [name]: event.target.value }
    setEditExperience(changedExperience);
  }

  const handleCheckboxNewExperience = () => {
    const newExperienceToBeAdded = { ...newExperience, present: !newExperience.present, end_date: "" }
    setNewExperience(newExperienceToBeAdded);
  }

  const handleCheckboxEditExperience = () => {
    const edittedExperienceToBeAdded = { ...editExperience, present: !editExperience.present, end_date: "" }
    setEditExperience(edittedExperienceToBeAdded);
  }

  const saveEdittedExperience = (ex) => {
    const newExperiences = [...experienceData.experiences];
    newExperiences[showEditModal - 1] = ex;
    const newExperienceData = { ...experienceData, experiences: newExperiences };
    setExperienceData(newExperienceData);
    props.onUpdate({ experience: newExperienceData });
    setShowEditModal(false);
  }

  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>Let’s work on your experience!</Alert.Heading>
        <h7>
          Start with your most recent job and work backwards. You can include relevant
          volunteer work, internships, and extracurricular activities too.
        </h7>
      </Alert>

      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. Experience, Work Experience"
              value={experienceData.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>


      {(experienceData == null) ? "" :
        (experienceData.experiences || []).map((item, index) => {
          return (
            <Card key={item.description} border="primary" style={{ width: '28rem', margin: '.3rem' }}>
              <Card.Body>
                <Card.Title>{item.employer_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {showDateFromTo(item.start_date, item.end_date)}
                </Card.Subtitle>
                <Card.Text>
                  {item.responsibilities[0]}
                </Card.Text>
                <div>
                  <Button variant="primary" type="button" style={{ margin: '.2rem' }}
                    onClick={() => {
                      setShowEditModal(index + 1)
                      setEditExperience(item)
                    }
                    }>Edit</Button>
                  <Button variant="primary" type="button"
                    onClick={() => deleteExperience(index)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          )
        }
        )}


      <Button type="button" variant='primary'
        onClick={() => setShowAddModal(true)} size='m'>+ ADD EXPERIENCE</Button>

      <CustomModal
        title="Add Experience"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={() => saveNewExperience(newExperience)}
      >

        <Form>
          <Form.Group controlId="employer_name">
            <Form.Label>Employer Name</Form.Label>
            <Form.Control
              size="md"
              type="text"
              required
              onChange={handleNewExperienceChange}
              value={newExperience.employer_name}
            />
          </Form.Group>


          <Form.Group controlId="employer_description">
            <Form.Label>Employer Description</Form.Label>
            <Form.Control
              size="md"
              type="text"
              required
              onChange={handleNewExperienceChange}
              value={newExperience.employer_description}
            />
          </Form.Group>

          <Form.Group controlId="job_title">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              size="md"
              type="text"
              required
              onChange={handleNewExperienceChange}
              value={newExperience.job_title}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <DatePicker className="form-control" selected={newExperience.start_date}
                onChange={(start_date) => handleNewExperienceChange({ target: { id: 'start_date', value: start_date } })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="end_date">
              <Form.Label>End Date</Form.Label>
              <DatePicker className="form-control" disabled={newExperience.present} selected={newExperience.end_date}
                onChange={(end_date) => handleNewExperienceChange({ target: { id: 'end_date', value: end_date } })}
              />
            </Form.Group>

            <Form.Group className="align-self-end" id="checkbox" controlId="present">
              <Form.Check
                type="checkbox"
                label="Present"
                onChange={handleCheckboxNewExperience}
                value={newExperience.present}
              />
            </Form.Group>

          </Form.Row>


          <Form.Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                size="md"
                type="text"
                required
                onChange={handleNewExperienceChange}
                value={newExperience.city}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                size="md"
                type="text"
                required
                onChange={handleNewExperienceChange}
                value={newExperience.country}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Responsibilities</Form.Label>
            <ReactListInput
              placeholder="Enter all your responsibilities"
              initialStagingValue=''
              onChange={(res) => handleNewExperienceChange({ target: { id: 'responsibilities', value: res } })}
              maxItems={5}
              ItemComponent={Item}
              StagingComponent={StagingItem}
              value={newExperience.responsibilities || []}
            />
          </Form.Group>

          <hr className="mt-4 mb-4" />

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Achievements</Form.Label>
            <ReactListInput
              initialStagingValue=''
              onChange={(res) => handleNewExperienceChange({ target: { id: 'achievements', value: res } })}
              maxItems={5}
              ItemComponent={Item}
              StagingComponent={StagingItem}
              value={newExperience.achievements || []}
            />
          </Form.Group>

        </Form>
      </CustomModal>



      <CustomModal
        title="Edit Experience"
        show={!!showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={() => saveEdittedExperience(editExperience)}
      >

        <Form>
          <Form.Group controlId="employer_name">
            <Form.Label>Employer Name</Form.Label>
            <Form.Control
              size="md"
              type="text"
              required
              onChange={handleEditExperienceChange}
              value={editExperience.employer_name}
            />
          </Form.Group>

          <Form.Group controlId="employer_description">
            <Form.Label>Employer Description</Form.Label>
            <Form.Control
              size="md"
              type="text"
              required
              onChange={handleEditExperienceChange}
              value={editExperience.employer_description}
            />
          </Form.Group>

          <Form.Group controlId="job_title">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              size="md"
              type="text"
              required
              onChange={handleEditExperienceChange}
              value={editExperience.job_title}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <DatePicker className="form-control" 
              // selected={new Date(editExperience.start_date)}
              selected={(typeof editExperience.start_date === 'string')? new Date(editExperience.start_date):editExperience.start_date}
                onChange={(start_date) => handleEditExperienceChange({ target: { id: 'start_date', value: start_date } })}
                value={new Date(editExperience.start_date)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="end_date">
              <Form.Label>End Date</Form.Label>
              <DatePicker className="form-control" disabled={editExperience.present} 
              selected={editExperience.end_date ? new Date(editExperience.end_date):new Date()}
                onChange={(end_date) => handleEditExperienceChange({ target: { id: 'end_date', value: end_date } })}
                value={new Date(editExperience.end_date)}
              />
            </Form.Group>

            <Form.Group className="align-self-end" id="checkbox" controlId="present">
              <Form.Check type="checkbox"
                label="Present"
                onChange={handleCheckboxEditExperience}
                value={editExperience.present}
                defaultChecked={editExperience.present}
              />
            </Form.Group>

          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                size="md"
                type="text"
                required={true}
                onChange={handleEditExperienceChange}
                value={editExperience.city}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                size="md"
                type="text"
                required
                onChange={handleEditExperienceChange}
                value={editExperience.country}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Responsibilities</Form.Label>
            <ReactListInput
              initialStagingValue=''
              onChange={(res) => handleEditExperienceChange({ target: { id: 'responsibilities', value: res } })}
              maxItems={5}
              ItemComponent={Item}
              StagingComponent={StagingItem}
              value={editExperience.responsibilities || []}
            />
          </Form.Group>

          <hr className="mt-4 mb-4" />

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Achievements</Form.Label>
            <ReactListInput
              initialStagingValue=''
              onChange={(res) => handleEditExperienceChange({ target: { id: 'achievements', value: res } })}
              maxItems={5}
              ItemComponent={Item}
              StagingComponent={StagingItem}
              value={editExperience.achievements || []}
            />
          </Form.Group>
        </Form>
      </CustomModal>
    </>)
}
