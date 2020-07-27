import React from 'react';
import { action } from '@storybook/addon-actions';
import PersonalInfoForm from '../components/forms/PersonalInfoForm.js';

export default {
  title: 'PersonalInfo',
  component: PersonalInfoForm ,
};

export const PersonalInfo = () => <PersonalInfoForm onUpdate={action('Update Received')} />;