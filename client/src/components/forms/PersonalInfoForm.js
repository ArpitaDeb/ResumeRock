import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PersonalInfoForm(props) {

  const initialState = props.data || {
    firstName: "",
    lastName: "",
    profTitle: "",
    email: "",
    linkedIn: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    formGridcity: "",
    formGridProvince: "",
    formGridZip: ""
  }
  const [PersonalInfo, setPersonalInfo] = useState(initialState);

  const onInputChange = (event) => {
    const updatedVal = event.target.id;
    console.log(updatedVal);
    setPersonalInfo({ ...PersonalInfo, [updatedVal]: event.target.value });
    props.onUpdate(PersonalInfo);
  }

  return (
    <Form onSubmit={event => event.preventDefault()} autoComplete="off">
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="firstName">
          <Form.Label>FIRST NAME</Form.Label>
          <Form.Control required type="text" placeholder="Enter First Name" value={PersonalInfo.firstName} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="lastName">
          <Form.Label>LAST NAME</Form.Label>
          <Form.Control required type="text" placeholder="Enter Last Name" value={PersonalInfo.lastName} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="profTitle">
          <Form.Label>PROFESSIONAL TITLE</Form.Label>
          <Form.Control required type="text" placeholder="Enter Professional Title" value={PersonalInfo.profTitle} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="email">
          <Form.Label>EMAIL</Form.Label>
          <Form.Control required type="email" placeholder="Enter Email" value={PersonalInfo.email} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="linkedIn">
          <Form.Label>LINKEDIN PROFILE</Form.Label>
          <Form.Control required type="url" placeholder="Enter LinkedIn Profile" value={PersonalInfo.linkedIn} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="phoneNumber">
          <Form.Label>PHONE NUMBER</Form.Label>
          <Form.Control required type="phone" placeholder="Enter Phone Number" value={PersonalInfo.phoneNumber} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="addressLine1">
          <Form.Label>ADDRESS LINE 1</Form.Label>
          <Form.Control required placeholder="Enter Address" value={PersonalInfo.addressLine1} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="addressLine2">
          <Form.Label>ADDRESS LINE 2</Form.Label>
          <Form.Control placeholder="Enter Address" value={PersonalInfo.addressLine2} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridcity">
          <Form.Label>CITY</Form.Label>
          <Form.Control required placeholder="Enter City" value={PersonalInfo.formGridcity} onChange={onInputChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridProvince">
          <Form.Label>PROVINCE</Form.Label>
          <Form.Control required placeholder="Enter Province" value={PersonalInfo.formGridProvince} onChange={onInputChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>POSTAL CODE</Form.Label>
          <Form.Control required placeholder="Enter Postal Code" value={PersonalInfo.formGridZip} onChange={onInputChange} />
        </Form.Group>
      </Form.Row>
      <Button type="submit" variant='primary' size='sm'>Submit</Button>
    </Form>
  );
}