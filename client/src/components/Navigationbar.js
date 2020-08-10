import React, { useState } from "react";
import { Navbar, FormControl, Button, Nav, Form } from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";
import Login from "../components/userLR/Login";
import Registration from "../components/userLR/Registration";
import ResumeBuilder from "../components/ResumeBuilder";
import { useHistory } from 'react-router-dom';
import logo from "../img/logo.png";
import "./NavigationBar.css"
import Landing from "../components/landingPage/Landing"

export default function Navigationbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const history = useHistory();
  const handleLogout = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
    setIsRegistered(false);
    history.replace('/Login');
  }

  const handleShowingRegistrationBtn = (data) => {
    setIsRegistered(data);
  }

  return (
    <>
      <Navbar className="navigation-bar" variant="dark" fixed="top">
        <Navbar.Brand as={Link} to="/" className="font-weight-bold">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        YourResume.Rock
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/resume">Build Resume</Nav.Link>
          {isLoggedIn ?
            <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            :
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          }
          {!isRegistered ?
            <Nav.Link as={Link} to="/registration">Register</Nav.Link>
            :
            null
          }
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/login">
          <Login
            setIsLoggedIn={setIsLoggedIn}
            onUpdate={handleShowingRegistrationBtn}
          />
        </Route>
        <Route path="/registration">
          <Registration isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/resume">
          <ResumeBuilder/>
        </Route>
        <Route path="/">
          {isLoggedIn ? <ResumeBuilder /> : <Landing />}
        </Route>


      </Switch>
    </>
  )
}