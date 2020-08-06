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
          <Form.Group as={Col} xs={8} controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text"  value={(personalInfo == null) ? "" : personalInfo.firstName} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" value={(personalInfo == null) ? "" : personalInfo.lastName} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="profTitle">
            <Form.Label>Professional Title</Form.Label>
            <Form.Control required type="text" value={(personalInfo == null) ? "" : personalInfo.profTitle} onChange={onInputChange} />
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
          <Form.Group as={Col} xs={8} controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control required type="phone" value={(personalInfo == null) ? "" : personalInfo.phoneNumber} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="addressLine1">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control required value={(personalInfo == null) ? "" : personalInfo.addressLine1} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridcity">
            <Form.Label>City</Form.Label>
            <Form.Control required value={(personalInfo == null) ? "" : personalInfo.formGridcity} onChange={onInputChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridProvince">
            <Form.Label>Province</Form.Label>
            <Form.Control required value={(personalInfo == null) ? "" : personalInfo.formGridProvince} onChange={onInputChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control required value={(personalInfo == null) ? "" : personalInfo.formGridZip} onChange={onInputChange} />
          </Form.Group>
        </Form.Row>
        <Button type="submit" variant='primary' size='sm'>Submit</Button>
      </Form>
    </>
  );
}