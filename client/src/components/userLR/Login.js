import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login({ isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(
      '/users/login', { email: email, password: password }
    ).then(() => {
      history.push('/');
      setIsLoggedIn(true);
    }).catch(error=> setError('please enter necessary details'));
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block bssize="large" disabled={!validateForm()} type="submit">
            Login
        </Button>
        </form>
      </div>
    </>
  );
}