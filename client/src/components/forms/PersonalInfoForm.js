import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

export default function PersonalInfoForm(props) {

  const [personalInfo, setPersonalInfo] = useState(props.data);

  const onInputChange = (event) => {
    const updatedVal = event.target.id;
    const newPersonalInfo = { ...personalInfo, [updatedVal]: event.target.value }
    setPersonalInfo(newPersonalInfo);
    props.onUpdate({ personal_info: newPersonalInfo });
  }

  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>Tell us about yourself!</Alert.Heading>
        <p>
        This section lets employers know who you are and how to get in touch with you.
        </p>
      </Alert>

      <Form onSubmit={event => event.preventDefault()} autoComplete="off">
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text"  value={(personalInfo == null) ? "" : personalInfo.first_name} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" value={(personalInfo == null) ? "" : personalInfo.last_name} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="prof_title">
            <Form.Label>Professional Title</Form.Label>
            <Form.Control required type="text" value={(personalInfo == null) ? "" : personalInfo.prof_title} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" value={(personalInfo == null) ? "" : personalInfo.email} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="linkedIn">
            <Form.Label>LinkeIn Profile</Form.Label>
            <Form.Control required type="url" value={(personalInfo == null) ? "" : personalInfo.linkedIn} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control required type="phone" value={(personalInfo == null) ? "" : personalInfo.phone_number} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="address_line1">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control placeholder="E.g. 110 Kent Street" required value={(personalInfo == null) ? "" : personalInfo.address_line1} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control required value={(personalInfo == null) ? "" : personalInfo.city} onChange={onInputChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="province">
            <Form.Label>Province</Form.Label>
            <Form.Control required value={(personalInfo == null) ? "" : personalInfo.province} onChange={onInputChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="postal_code">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control required value={(personalInfo == null) ? "" : personalInfo.postal_code} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Button type="submit" variant='primary' size='sm'>Submit</Button>
      </Form>
    </>
  );
}