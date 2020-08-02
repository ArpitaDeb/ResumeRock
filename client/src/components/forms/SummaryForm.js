import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default function SummaryForm(props) {

  const [summary, setSummary] = useState(props.data);

  const handleChange = (event) => {
    const name = event.target.id;
    const newSummary= { ...summary, [name]: event.target.value }
    setSummary(newSummary);
    props.onUpdate({summary: newSummary});
  }

  return (
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
  );
}