import React, { useState, useCallback } from "react";
import CustomerServiceTemplate from "../templates/customerService/CustomerServiceTemplate"
import { ButtonGroup, Button } from "react-bootstrap";
import "./preview.css"
import fileDownload from 'js-file-download';
import { Upload } from "./Upload";

export default function Preview(props) {
  const [showUpload, setShowUpload] = useState(false);

  const exportJSON = useCallback(() => {
    fileDownload(JSON.stringify(props.data), 'resume.json');
  }, [props.data])
  const onFileImported = (data) => {
    setShowUpload(false)
    props.onUpdate(JSON.parse(data))
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
            onClick={() => { setShowUpload(true) }}
          >
            Import JSON
            </Button>
        </ButtonGroup >
      </div>
      <div >
        {showUpload ? <Upload onFileImported={onFileImported} /> : <CustomerServiceTemplate data={props.data} />}
      </div>
    </div >
  )

}