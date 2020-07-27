import React from "react";
import { Nav } from "react-bootstrap";
import "./Leftsidebar.css";

export default function LeftSidebar(props) {
  const selectedKey = props.onUpdate;
  return (
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
      activeKey="/home"
    >
      <div className="sidebar-sticky"></div>
      {props.items.map((item) => (
        <Nav.Item onSelect={selectedKey}>
          <Nav.Link eventKey="link">{item.title}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>

  );
};