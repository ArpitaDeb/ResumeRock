import React, { useState, useCallback } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Registration({ isLoggedIn, setIsLoggedIn }) {
  const [state, setState] = useState({
    email: "",
    password: "",
    userName: ""
  })
  const [error, setError] = useState("");
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
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    axios.post(
      '/users/register', { email: state.email, password: state.password, userName: state.userName }
    ).then(() => {
      history.push('/');
      setIsLoggedIn(true);
    }).catch(error => setError(error.response.data.errorMsg));
  }

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bssize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={state.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={state.password}
              onChange={handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="userName" bssize="large">
            <FormLabel>User Name</FormLabel>
            <FormControl
              value={state.userName}
              onChange={handleChange}
              type="text"
            />
          </FormGroup>
          <Button block bssize="large" disabled={!validateForm()} type="submit">
            Register
        </Button>
          <div className='error'>{error}</div>
        </form>
      </div>
    </>
  );
}