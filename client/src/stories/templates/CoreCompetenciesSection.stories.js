
import React from 'react';
import CoreCompetenciesSection from "../../components/templates/customerService/CoreCompetenciesSection";

export default {
  title: 'CoreCompetenciesSection',
  component: CoreCompetenciesSection,
};

const sampleData = {
  heading: 'Core Competencies',
  skills: [
    {
      name: "Customer service",
      rating: "5"
    },
    {
      name: "Excellent communicator",
      rating: "5"
    },
    {
      name: "Notable interpersonal skills",
      rating: "5"
    },
    {
      name: "B2C sales and marketing",
      rating: "5"
    },
    {
      name: "Administrative support",
      rating: "5"
    },
    {
      name: "Microsoft Office Suite",
      rating: "5"
    }
  ]
}
export const Filled = () => <CoreCompetenciesSection heading={sampleData.heading} skills={sampleData.skills} />;
