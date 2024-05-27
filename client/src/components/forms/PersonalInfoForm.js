import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

export default function PersonalInfoForm({ data, onUpdate }) {

  const onInputChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    const newPersonalInfo = { ...data, [name]: value }
    onUpdate({ personal_info: newPersonalInfo });
  }

  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>Tell us about yourself!</Alert.Heading>
        <h6>
          This section lets employers know who you are and how to get in touch with you.
        </h6>
      </Alert>

      <Form onSubmit={event => event.preventDefault()} autoComplete="off">
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" value={data.first_name || ""} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" value={data.last_name || ""} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="prof_title">
            <Form.Label>Professional Title</Form.Label>
            <Form.Control required type="text" value={data.prof_title || ""} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" value={data.email || ""} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="linkedIn">
            <Form.Label>LinkedIn Profile</Form.Label>
            <Form.Control required type="url" value={data.linkedIn || ""} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="E.g. (404) 292-9090" required type="phone" value={data.phone_number || ""} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="address_line1">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control placeholder="E.g. 110 Kent Street" required value={data.address_line1 || ""} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control required value={data.city || ""} onChange={onInputChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="province">
            <Form.Label>Province</Form.Label>
            <Form.Control required value={data.province || ""} onChange={onInputChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="postal_code">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control placeholder="E.g. K2P 0LM" required value={data.postal_code || ""} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
      </Form>
    </>
  );
}