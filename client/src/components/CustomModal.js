import React from "react";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function CustomModal(props) {
  console.log(props);
  console.log(props.children);
  return (
    <div>
      <Modal show={props.show} onHide={() => props.onHide({ msg: 'Cross Icon Clicked!' })}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onClick({ msg: 'Modal Closed!' })}>Cancel</Button>
          <Button variant="primary" type="submit" onClick={() => props.onSubmit({ msg: 'Modal Saved!' })}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
} 