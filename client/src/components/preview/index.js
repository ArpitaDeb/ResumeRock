import React, { useState, useCallback } from "react";
import CustomerServiceTemplate from "../templates/customerService/CustomerServiceTemplate"
import { ButtonGroup, Button } from "react-bootstrap";
import "./preview.css"
import fileDownload from 'js-file-download';
import { Upload } from "./Upload";

export default function Preview(props) {

  const [showUpload, setShowUpload] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const showImportBtn = () => Object.keys(props.data).length === 0

  const exportJSON = useCallback(() => {
    fileDownload(JSON.stringify(props.data), 'resume.json');
  }, [props.data])
  const onFileImported = (data) => {
    setShowMenu(true);
    setShowUpload(false)
    props.onUpdate(JSON.parse(data))
  }

  const handleClose = (e) => {
    e.target.style.display = 'none';
    setFullscreen(false);
  }
  return (
    <div>
      {showMenu &&
        <>
          <div className="bar-container">
            <ButtonGroup className="previw-bar mt-2">
              <Button
                variant="light"
                disabled={showImportBtn()}
              >Export to PDF</Button>
              <Button
                disabled={showImportBtn()}
                variant="light"
                onClick={() => { setFullscreen(true); console.log("HELLO") }}
              >
                Fullscreen
            </Button>
              <Button
                disabled={showImportBtn()}
                variant="light"
                onClick={exportJSON}
              >
                Export JSON
          </Button>
              <Button
                variant="light"
                onClick={() => { setShowMenu(false); setShowUpload(true) }}
              >
                Import JSON
            </Button>
            </ButtonGroup >
          </div>
          <div>
            <CustomerServiceTemplate data={props.data} />
          </div>
        </>
      }
      {
        fullscreen &&
        <div className="overlay">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
           <CustomerServiceTemplate data={props.data} />
        </div>
      }
      <div >
        {showUpload ? <Upload onFileImported={onFileImported} /> : <CustomerServiceTemplate data={props.data} />}
      </div>
    </div >
  )
}