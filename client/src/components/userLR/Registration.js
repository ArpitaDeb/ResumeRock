import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './Login.css';

export default function Registration() {
  const [state, setState] = useState({
    email: "",
    password: "",
    userName: ""
  })
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  const validateForm = () => {
    return state.email.length > 0 && state.password.length > 0 && state.userName.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={state.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={state.password}
              onChange={handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="userName" bsSize="large">
            <FormLabel>User Name</FormLabel>
            <FormControl
              value={state.userName}
              onChange={handleChange}
              type="text"
            />
          </FormGroup>
          <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Register
        </Button>
        </form>
      </div>
    </>
  );
}