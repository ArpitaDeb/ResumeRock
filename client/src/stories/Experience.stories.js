import React from 'react';
import { action } from '@storybook/addon-actions';
import Experience from '../components/forms/Experience';

export default {
  title: 'Experience',
  component: Experience
};

export const emptyExperience = () => ( <Experience onUpdate={action('Update Received')} />)

export const experienceWithHeading = () => ( <Experience onUpdate={action('Update Received')} data={{heading:"experience"}}/>)