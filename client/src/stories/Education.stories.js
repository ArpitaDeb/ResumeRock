import React from 'react';
import { action } from '@storybook/addon-actions';
import EducationForm from '../components/forms/EducationForm';
export default {
  title: 'Education',
  component: EducationForm
};
export const Education = () => <EducationForm
  onUpdate={action('Update Received')}
  onEducationChange={action('Education added')}
  onHeadingChange={action('heading added')}
/>;
export const setEducation = () => (
  <EducationForm
    onUpdate={action('Update Received')}
    onEducationChange={action('Education added')}
    onHeadingChange={action('heading added')}
    heading="Educations"
    educations={[{
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
      ENDDATE: 'JUNE 2020'
    }]}
  />
); 