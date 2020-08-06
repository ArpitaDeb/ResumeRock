import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CustomModal from "../CustomModal";

export default function ReferenceForm(props) {
  console.log(props);
  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal conatins the id of the selected skill to be editted
  const [showEditModal, setShowEditModal] = useState();
  const [reference, setReference] = useState(props.data || { referees: [] });
  const [newRef, setNewRef] = useState({ name: "", email: "" });
  const [editRef, setEditRef] = useState({});

  const onHeadingChange = (event) => {
    const newRefHead = { ...reference, heading: event.target.value }
    setReference(newRefHead);
    props.onUpdate({ references: newRefHead });
  }
  const handleRefChange = (event) => {
    const updatedVal = event.target.id;
    const addedRef = { ...newRef, [updatedVal]: event.target.value }
    setNewRef(addedRef);
  }
  const submitNewRef = (refer) => {
    const totalReferees = [...reference.referees, refer]
    const newTotalReferees = { ...reference, referees: totalReferees };
    setReference(newTotalReferees);
    props.onUpdate({ references: newTotalReferees });
    setShowAddModal(false);
    setNewRef({ name: "", email: '' });
  }
  const handleEditRefChange = (event) => {
    const name = event.target.id;
    const editedRef = { ...editRef, [name]: event.target.value }
    setEditRef(editedRef);
  }

  const submitEdittedRef = (refer) => {
    const totalReferees = [...reference.referees];
    totalReferees[showEditModal - 1] = refer;
    const newTotalReferees = { ...reference, referees: totalReferees };
    setReference(newTotalReferees);
    props.onUpdate({ references: newTotalReferees });
    setShowEditModal(false);
  }

  const deleteReferee = (index) => {
    const totalReferees = [...reference.referees];
    totalReferees.splice(index, 1);
    const newtotalReferees = { ...reference, referees: totalReferees };
    setReference(newtotalReferees);
    props.onUpdate({ references: newtotalReferees });
  }

  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>Create a Reference List!</Alert.Heading>
        <p>
        Many potential employers ask for a list of references in a job application or at the end of a job interview.
        That’s why it’s a good idea to have a list of references handy when you’re applying for a new job.
        </p>
      </Alert>

      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. References"
              value={(reference == null) ? "" : reference.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        reference.referees.map((item, index) => {
          return (
            <Card border="primary" style={{ width: '20rem', margin: '.5rem' }}>
              <Card.Body>
                <Card.Subtitle>NAME</Card.Subtitle>
                <Card.Text>
                  {item.name}
                </Card.Text>
                <Card.Subtitle>EMAIL</Card.Subtitle>
                <Card.Text>
                  {item.email}
                </Card.Text>
                <div>
                  <Button variant="primary" type="button" style={{ margin: '.2rem' }}
                    onClick={() => {
                      setShowEditModal(index + 1)
                      setEditRef(item)
                    }
                    }>Edit</Button>
                  <Button variant="primary" type="button"
                    onClick={() => deleteReferee(index)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          )
        })
      }
      <Button type="button" variant='primary'
        onClick={() => setShowAddModal(true)} size='m'>+ ADD REFERENCE</Button>
      <CustomModal
        title="Add REFERENCE"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={() => submitNewRef(newRef)}
      >
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={5} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="md"
                type="text"
                required
                placeholder="Enter Referees name"
                onChange={handleRefChange}
                value={newRef.name}
              />
            </Form.Group>
            <Form.Group as={Col} xs={5} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="md"
                type="email"
                required
                placeholder="Enter Referees Email"
                onChange={handleRefChange}
                value={newRef.email}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </CustomModal>
      <CustomModal
        title="Edit Referee"
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={() => submitEdittedRef(editRef)}
      >
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={5} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control size="md" type="text" required
                value={editRef.name}
                onChange={handleEditRefChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} xs={5} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control size="md" type="text" required
                value={editRef.email}
                onChange={handleEditRefChange} />
            </Form.Group>
          </Form.Row>
        </Form>
      </CustomModal>
    </>
  );
};