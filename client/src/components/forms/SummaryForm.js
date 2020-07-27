
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default function SummaryForm(props) {

  const initialState = props.data || { heading: "", body: "" }
  const [summary, setSummary] = useState(initialState);

  const handleChange = (event) => {
    const name = event.target.id;
    console.log(name);
    setSummary({ ...summary, [name]: event.target.value });
    props.onUpdate(summary);
  }

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="heading">
          <Form.Label>Heading</Form.Label>
          <Form.Control type="text" placeholder="E.g. Summary, Professional Summary, About Me" value={summary.heading} onChange={handleChange} />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="body">
        <Form.Label>Summary of Qualifications</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Briefly introduce yourself" value={summary.body} onChange={handleChange} />
      </Form.Group>
    </Form>
  );
}