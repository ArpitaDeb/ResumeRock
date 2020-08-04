import React from 'react';
import { action } from '@storybook/addon-actions';
import ReferenceForm from '../components/forms/CoreCompetencyForm';
export default {
  title: 'Reference',
  component: ReferenceForm
};
export const Reference = () => <ReferenceForm
  onReferenceChange={action('Refs added')}
  onUpdate={action('onUpdate')}
/>;
export const setReference = () => (
  <ReferenceForm
    onReferenceChange={action('Refs added')}
    onHeadingChange={action('heading added')}
    onUpdate={action('Update Received')}
    heading="References"
    references={[{
      id: 1,
      name: "Dominic",
      email: "Dom@gmail.com"
    }, {
      id: 2,
      name: "Vasily",
      email: "vasily@gmail.com"
    }, {
      id: 3,
      name: "Emma",
      email: "ema@gmail.com"
    }]}
  />
);