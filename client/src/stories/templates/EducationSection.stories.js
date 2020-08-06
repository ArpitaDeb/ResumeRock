
import React from 'react';
import EducationSection from "../../components/templates/customerService/EducationSection";

export default {
  title: 'EducationSection',
  component: EducationSection,
};

const sampleData = {
  heading: 'Education and Qualifications',
  educationInfo: [
    {
      "institution": "Mohawk College",
      "fieldOfStudy": "Business Administration",
      "typeOfDegree": "Diploma",
      "GPA": "4",
      "start_date": new Date("2020-03-01T05:00:00.000Z"),
      "end_date": new Date("2020-09-01T04:00:00.000Z"),
      "city": "Hamilton",
      "country": "Canada",
      "in_progress": false
    },
  ]
}
export const Filled = () => <EducationSection heading={sampleData.heading} educationInfo={sampleData.educationInfo} />;
