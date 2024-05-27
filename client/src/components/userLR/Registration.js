import React, { useState, useCallback } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';
import {
  Card,
  CardBody,
} from "reactstrap";
import avatar from "../../img/avatar.png";


export default function Registration(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
    confirm_password: ""
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
    return state.email.length > 0 && state.password.length > 0 && state.password === state.confirm_password;
  }
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(
      '/users/register', { email: state.email, password: state.password, username: state.email }
    ).then(() => {
      history.push('/');
      props.onUpdate(true);
    }).catch(error => setError(error.response.data.errorMsg));
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
              <h3 className="text-center">Register Now!
                </h3>

              <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bssize="large" className="form_inputs">
                  <FormLabel />
                  <FormControl
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={state.email}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="password" bssize="large" className="form_inputs">
                  <FormLabel />
                  <FormControl
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                    type="password"
                  />
                </FormGroup>

                <FormGroup controlId="confirm_password" bssize="large" className="form_inputs">
                  <FormLabel />
                  <FormControl
                    placeholder="Confirm your password"
                    value={state.confirm_password}
                    onChange={handleChange}
                    type="password"
                  />
                </FormGroup>

                <Button block bssize="large" disabled={!validateForm()} type="submit" className="mt-4" >
                  Register
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