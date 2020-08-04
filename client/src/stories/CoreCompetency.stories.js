import React from 'react';
import { action } from '@storybook/addon-actions';
import CoreCompetencyForm from '../components/forms/CoreCompetencyForm';
export default {
  title: 'CoreCompetency',
  component: CoreCompetencyForm
};
export const CoreCompetency = () => <CoreCompetencyForm
  onSkillChange={action('Skills added')}
  onUpdate={action('onUpdate')}
/>;
export const setCoreCompetency = () => (
  <CoreCompetencyForm
    onSkillChange={action('Skills added')}
    onHeadingChange={action('heading added')}
    skills={[{
      id: 1,
      name: "React",
      ratingText: "Basic"
    }, {
      id: 2,
      name: "NodeJS",
      ratingText: "Expert"
    }, {
      id: 3,
      name: "React Native",
      ratingText: "Advanced"
    }]}
    heading="Skills"
  />
);