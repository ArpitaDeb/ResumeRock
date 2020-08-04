import React from "react";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function CustomModal(props) {
  return (
    <div>
      <Modal show={props.show} onHide={() => props.onClose()}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onClose()}>Cancel</Button>
          <Button variant="primary" type="submit" onClick={() => props.onSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
} 