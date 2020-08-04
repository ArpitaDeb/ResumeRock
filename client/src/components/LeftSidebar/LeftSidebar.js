import React from "react";
import { Nav } from "react-bootstrap";
import "./Leftsidebar.css";

export default function LeftSidebar(props) {

  return (
    <Nav className="flex-column" onSelect={(selectedItem) => props.onUpdate(selectedItem)}>
      {props.items.map((item) => (
        <Nav.Item key={item.id}>
          <Nav.Link eventKey={item.id}>{item.title}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};