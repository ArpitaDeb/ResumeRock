import React from "react";
import CustomerServiceTemplate from "../templates/customerService/CustomerServiceTemplate"
import { ButtonGroup, Button } from "react-bootstrap";
import "./preview.css"
import fileDownload from 'js-file-download';

export default function Preview(props) {

  const exportJSON = () => {
    fileDownload(JSON.stringify(props.data), 'resume.json');
  }


  return (
    <div>
      <div className="bar-container">
        <ButtonGroup className="previw-bar">
          <Button variant="light">Export to PDF</Button>
          <Button variant="light">Fullscreen</Button>
          <Button
            variant="light"
            onClick={exportJSON}
          >
            Export JSON
          </Button>
          <Button
          variant="light"
          >
            Import JSON
            </Button>
        </ButtonGroup >
      </div>
      <div >
        <CustomerServiceTemplate data={props.data} />
      </div>
    </div >
  )

}