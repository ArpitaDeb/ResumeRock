import React, { useState, useCallback } from "react";
import CustomerServiceTemplate from "../templates/customerService/CustomerServiceTemplate"
import { ButtonGroup, Button } from "react-bootstrap";
import "./preview.css"
import fileDownload from 'js-file-download';
import { Upload } from "./Upload";

export default function Preview(props) {
  const [showImportBtn, setShowImportBtn] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const exportJSON = useCallback(() => {
    fileDownload(JSON.stringify(props.data), 'resume.json');
  }, [props.data])
  const onFileImported = (data) => {
    debugger
    setShowImportBtn(false)
    setShowMenu(true);
    setShowUpload(false)
    props.onUpdate(JSON.parse(data))
  }

  return (
    <div>
      {showMenu ?
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
              onClick={() => {setShowImportBtn(false) ; setShowUpload(true)} }
            >
              Import JSON
            </Button>
          </ButtonGroup >
        </div>
        : showImportBtn ?
          <div className="bar-container">
            <ButtonGroup className="previw-bar">
              <Button
                variant="light"
                onClick={() => { setShowImportBtn(false) ; setShowUpload(true)}}
              >
                Import JSON
            </Button>
            </ButtonGroup>
          </div> : ""
}
      <div >
        {showUpload ? <Upload onFileImported={onFileImported} /> : showMenu ? <CustomerServiceTemplate data={props.data} /> : ""}
      </div>
    </div >
  )

}