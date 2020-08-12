import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import avatar from "../../img/avatar.png";
import './Login.css';

import {
  Card,
  CardBody,
} from "reactstrap";

export default function Login(props) {
  const { setIsLoggedIn, onUpdate } = props
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
        history.push('/');
        setIsLoggedIn(true);
        onUpdate(true);
      }).catch(error => setError(error.response.data.errorMsg));
    }
  }

  return (
    <>
      <div className="background" />
      <div className="login-container">
        <Card className="shadow border-0 d-inline-block p-5">
          <CardBody>
            <div >
              <div className="avatar">
                <img src={avatar} alt="Avatar" />
              </div>
              <h3 className="text-center">Member Login
                </h3>
              <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bssize="large" className="form_inputs">
                  <FormLabel />
                  <FormControl
                    autoFocus
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="password" bssize="large" className="form_inputs">
                  <FormLabel />
                  <FormControl
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                  />
                </FormGroup>
                <Button block bssize="large" type="submit" className="mt-4" >
                  Login
                  </Button>

                <div className='error'>{error}</div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>



    </>
  );
}