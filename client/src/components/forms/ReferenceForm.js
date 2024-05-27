import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CustomModal from "../CustomModal";

export default function ReferenceForm({ data, onUpdate }) {
  console.log("fatt", data)
  const initialRef = { name: "", email: "" };
  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal contains the id of the selected skill to be editted
  const [showEditModal, setShowEditModal] = useState();
  const [newRef, setNewRef] = useState(initialRef);
  const [editRef, setEditRef] = useState({});

  const onHeadingChange = (event) => {
    const newRefHead = { ...data, heading: event.target.value }
    onUpdate({ references: newRefHead });
  }
  const handleRefChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setNewRef((prev) => ({ ...prev, [name]: value }));
  }
  const submitNewRef = () => {
    const totalReferees = [...data.referees, newRef]
    const newTotalReferees = { ...data, referees: totalReferees };
    onUpdate({ references: newTotalReferees });
    setShowAddModal(false);
    setNewRef({ name: "", email: '' });
  }
  const handleEditRefChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setEditRef((prev) => ({ ...prev, [name]: value }));
  }

  const handleCheckboxNewRef = () => {
    const newRefToBeAdded = { ...newRef, req: !newRef.req, name: "", email: "" }
    setNewRef(newRefToBeAdded);
  }

  const handleCheckboxEditRef = () => {
    const edittedRefToBeAdded = { ...editRef, req: !editRef.req, name: "", email: "" }
    setEditRef(edittedRefToBeAdded);
  }


  const submitEdittedRef = () => {
    const totalReferees = [...data.referees];
    totalReferees[showEditModal - 1] = editRef;
    const newTotalReferees = { ...data, referees: totalReferees };
    onUpdate({ references: newTotalReferees });
    setShowEditModal(false);
  }

  const deleteReferee = (index) => {
    const totalReferees = [...data.referees];
    totalReferees.splice(index, 1);
    const newtotalReferees = { ...data, referees: totalReferees };
    onUpdate({ references: newtotalReferees });
  }

  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>Create a Reference List!</Alert.Heading>
        <h7>
          Many potential employers ask for a list of references in a job application or at the end of a job interview.
          That’s why it’s a good idea to have a list of references handy when you’re applying for a new job.
        </h7>
      </Alert>

      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. References"
              value={data.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        data.referees.map((item, index) => {
          if (!item.name || !item.email) {
            return (
              <Card border="primary" style={{ width: '20rem', margin: '.5rem' }}>
                <Card.Body>
                  <div>
                    Reference upon request
                  </div>

                  <div className="mt-3">
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
            );
          } else {
            return (
              <Card border="primary" style={{ width: '20rem', margin: '.5rem' }}>
                <Card.Body>
                  <Card.Subtitle>Name:</Card.Subtitle>
                  <Card.Text>
                    {item.name}
                  </Card.Text>
                  <Card.Subtitle>Email:</Card.Subtitle>
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
          }
        })
      }
      <Button type="button" variant='primary'
        onClick={() => setShowAddModal(true)} size='m'>+ ADD REFERENCE</Button>
      <CustomModal
        title="Add Reference"
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
                onChange={handleRefChange}
                value={newRef.name}
                disabled={newRef.req}
              />
            </Form.Group>
            <Form.Group as={Col} xs={5} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="md"
                type="email"
                required
                onChange={handleRefChange}
                value={newRef.email}
                disabled={newRef.req}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group className="align-self-end" id="checkbox" controlId="present">
            <Form.Check
              type="checkbox"
              id="autoSizingCheck"
              className="my-1"
              label="Available upon request"
              checked={newRef.req}
              onChange={handleCheckboxNewRef}
            />
          </Form.Group>
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
                onChange={handleEditRefChange}
              />
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
          <Form.Group className="align-self-end" id="checkbox" controlId="present">
            <Form.Check
              type="checkbox"
              id="autoSizingCheck"
              className="my-1"
              label="Available upon request"
              checked={editRef.req}
              onChange={handleCheckboxEditRef}
            />
          </Form.Group>
        </Form>
      </CustomModal>
    </>
  );
};