import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

export default function SummaryForm({ data, onUpdate }) {
  const handleChange = (event) => {
    const { id, value } = event.target;
    const newSummary= { ...data, [id]: value }
    onUpdate({summary: newSummary});
  }

  return (
    <>
    <Alert variant="primary">
        <Alert.Heading>Make your resume shine with this section!</Alert.Heading>
        <h7>
        Your resume should start with a Summary of Qualifications that spotlights your most impressive and relevant accomplishments, skills, and experience.
        When employers are scanning your resume, this section illustrates your qualifications.
        </h7>
      </Alert>

    <Form>
      <Form.Row>
        <Form.Group as={Col} xs={8} controlId="heading">
          <Form.Label>Heading</Form.Label>
          <Form.Control type="text" placeholder="E.g. Summary, Professional Summary, About Me" value={data.heading || "" } onChange={handleChange} />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="body">
        <Form.Label>Summary of Qualifications</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Briefly introduce yourself" value={data.body || "" } onChange={handleChange} />
      </Form.Group>
    </Form>
    </>
  );
}