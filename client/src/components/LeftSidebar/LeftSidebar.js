import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./Leftsidebar.css";


export default function LeftSidebar(props) {
  const [selected, setSelected] = useState(props.items[0].id)
  const handleChange = (selectedItem) => {
    props.onUpdate(selectedItem)
    setSelected(selectedItem)
  }

  const Spacer = () => <span className="mr-1">&#10148;</span>
  return (
    <Nav className="flex-column sidebar" onSelect={handleChange} >
      {props.items.map((item) => (
        <Nav.Item>
          <Nav.Link eventKey={item.id} active={item.id === selected}>
            <Spacer/>
            {item.title}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};