
import React from 'react';
import SummarySection from "../../components/templates/customerService/SummarySection";

export default {
  title: 'SummarySection',
  component: SummarySection,
};

const sampleData= {
  heading: "summary of qualifications",
  body: "Experienced customer relationship professional offering demonstrated knowledge gained in telecommunications, finance, and retail services. Goal is to leverage work experience and strong background in customer service to enable effective operations for the company. Highly effective in developing rapport and building relationships with internal and external stakeholders."
}

export const Filled = () =><SummarySection heading={sampleData.heading} body={sampleData.body} />;