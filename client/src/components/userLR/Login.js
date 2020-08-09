import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login(props) {
  const { isLoggedIn, setIsLoggedIn, onUpdate } = props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const validateForm = () => {
    if (!email) {
      setError("email cannot be blank");
      return false;
    }
    setError("");
    if (!password) {
      setError("password cannot be blank");
      return false;
    }
    return true;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm) {
      axios.post(
        '/users/login', { email: email, password: password }
      ).then(() => {
        debugger;
        history.push('/');
        setIsLoggedIn(true);
        onUpdate(true);
      }).catch(error => setError(error.response.data.errorMsg));
    }
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
          <Button block bssize="large" type="submit">
            Login
        </Button>
          <div className='error'>{error}</div>
        </form>
      </div>
    </>
  );
}