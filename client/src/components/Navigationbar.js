import React from "react";
import { Navbar, FormControl, Button, Nav, Form } from "react-bootstrap";
import Login from "../components/userLR/Login";
import Registration from "../components/userLR/Registration";
import logo from "../img/logo.png";

export default function Navigationbar() {
  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Navbar.Brand href="#home" className="font-weight-bold">
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
        <Nav.Link href="#home">Build Resume</Nav.Link>
        <Nav.Link href="#Login">Login</Nav.Link>
        <Nav.Link href="#register">Register</Nav.Link>
      </Nav>
    </Navbar>
  )
}