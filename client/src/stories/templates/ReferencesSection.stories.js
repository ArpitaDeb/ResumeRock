
import React from 'react';
import ReferenceSection from "../../components/templates/customerService/ReferenceSection";

export default {
  title: 'ReferenceSection',
  referees: ReferenceSection,
};

const sampleData = {
  heading: 'References',
  referees: [
    {
      "name": "Dominic",
      "email": "dominic@gmail.com",
      "req": false
    },
    {
      "name": "Emma",
      "email": "emma@gmail.com",
      "req": false
    },
  ]
}

const sampleData2 = {
  heading: 'References',
  referees: [
    {
      "name": "",
      "email": "",
      "req": true
    },
  ]
}

export const normal = () => <ReferenceSection heading={sampleData.heading} referees={sampleData.referees} />;
export const uponRequest = () => <ReferenceSection heading={sampleData.heading} referees={sampleData2.referees} />;
