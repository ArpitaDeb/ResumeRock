import React from 'react';
import { action } from '@storybook/addon-actions';
import CoreCompetencyForm from '../components/forms/CoreCompetencyForm';
export default {
  title: 'CoreCompetency',
  component: CoreCompetencyForm
};
export const CoreCompetency = () => <CoreCompetencyForm
  onSkillChange={action('Skills added')}
  onHeadingChange={action('heading added')}
/>;
export const setCoreCompetency = () => (
  <CoreCompetencyForm
    onSkillChange={action('Skills added')}
    onHeadingChange={action('heading added')}
    skills={[{
      id: 1,
      name: "React"
    }, {
      id: 2,
      name: "NodeJS"
    }, {
      id: 3,
      name: "React Native"
    }]}
    heading="Skills"
  />
);