import React from 'react';
import { action } from '@storybook/addon-actions';
import EducationForm from '../components/forms/EducationForm';
export default {
  title: 'Education',
  component: EducationForm
};
export const Education = () => <EducationForm
  onUpdate={action('Update Received')}
/>;
export const setEducation = () => (
  <EducationForm
    onUpdate={action('Update Received')}
    heading="Educations"
    educationInfo={[{
      id: 1,
      INSTITUTION: "u OF T",
      FIELDOFSTUDY: "Engineering",
      TYPEOFDEGREE: "Bachelors",
      CGPA: 3,
      STARTDATE: 'JUNE 2018',
      ENDDATE: 'JUNE 2020'
    }, {
      id: 2,
      INSTITUTION: "u OF S",
      FIELDOFSTUDY: "Engineering",
      TYPEOFDEGREE: "Masters",
      CGPA: 3,
      STARTDATE: 'JUNE 2018',
      checked: true,
    }]}
  />
); 