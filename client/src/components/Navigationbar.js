import React from "react";
import { Navbar, FormControl, Button, Nav, Form } from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";
import Login from "../components/userLR/Login";
import Registration from "../components/userLR/Registration";
import ResumeBuilder from "../components/ResumeBuilder";
import logo from "../img/logo.png";
import "./NavigationBar.css"

export default function Navigationbar() {
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
          <Nav.Link as={Link} to="/">Build Resume</Nav.Link>
          <Nav.Link as={Link} to="/Login">Login</Nav.Link>
          <Nav.Link as={Link} to="/Registration">Register</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Registration">
          <Registration />
        </Route>
        <Route path="/">
          <ResumeBuilder />
        </Route>
      </Switch>
    </>
  )
}