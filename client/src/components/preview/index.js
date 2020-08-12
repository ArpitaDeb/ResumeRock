import React, { useState, useCallback, useRef } from "react";
import CustomerServiceTemplate from "../templates/customerService/CustomerServiceTemplate"
import { ButtonGroup, Button } from "react-bootstrap";
import "./preview.css"
import fileDownload from 'js-file-download';
import { Upload } from "./Upload";
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

export default function Preview(props) {

  const [showUpload, setShowUpload] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const ref = useRef(null)

  const showImportBtn = () => Object.keys(props.data).length === 0

  const exportJSON = useCallback(() => {
    fileDownload(JSON.stringify(props.data), 'resume.json');
  }, [props.data])
  const onFileImported = (data) => {
    setShowMenu(true);
    setShowUpload(false)
    props.onUpdate(JSON.parse(data))  }

  const handleClose = (e) => {
    e.target.style.display = 'none';
    setFullscreen(false);
  }
  const MyDoc = () => (
    <Document>
      <Page>
        <CustomerServiceTemplate ref={ref} data={props.data} style={{ textAlign: "center" }} />
      </Page>
    </Document>
  )

  return (
    <>
      <div className="non-printable">
        {showMenu &&
          <>
            <div className="bar-container">
              <ButtonGroup className="previw-bar mt-2">
                <Button
                  variant="light"
                  disabled={showImportBtn()}
                  onClick={() => {
                    try {
                      document.execCommand('print', false, null);
                    }
                    catch (e) {
                      window.print();
                    }
                  }}
                >Export to PDF</Button>
                <Button
                  disabled={showImportBtn()}
                  variant="light"
                  onClick={() => { setFullscreen(true) }}
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
                  onClick={() => { setShowMenu(false); setShowUpload(true)}}
                >
                  Import JSON
            </Button>
              </ButtonGroup >
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
    </>
  )
}