import React from "react";
import { Nav } from "react-bootstrap";
export default function LeftSidebar(props) {
  return (
  
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${ selectedKey } `)}
      >
        <div className="sidebar-sticky"></div>
        {props.items.map((item) => (
          <Nav.Item>
            <Nav.Link eventKey="link">{item.title}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    
  );
};
