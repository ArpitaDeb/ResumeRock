import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

export default function SummaryForm(props) {

  const [summary, setSummary] = useState(null);
  useEffect(()=>{
    setSummary(props.data)
  },[props.data])

  const handleChange = (event) => {
    const name = event.target.id;
    const newSummary= { ...summary, [name]: event.target.value }
    setSummary(newSummary);
    props.onUpdate({summary: newSummary});
  }

  return (
    <>
    <Alert variant="primary">
        <Alert.Heading>Make your resume shine with this section!</Alert.Heading>
        <p>
        Your resume should start with a Summary of Qualifications that spotlights your most impressive and relevant accomplishments, skills, and experience.
        When employers are scanning your resume, this section illustrates your qualifications.
        </p>
      </Alert>

    <Form>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="heading">
          <Form.Label>Heading</Form.Label>
          <Form.Control type="text" placeholder="E.g. Summary, Professional Summary, About Me" value={(summary==null) ? "" : summary.heading} onChange={handleChange} />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="body">
        <Form.Label>Summary of Qualifications</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Briefly introduce yourself" value={(summary==null) ? "" : summary.body} onChange={handleChange} />
      </Form.Group>
    </Form>
    </>
  );
}