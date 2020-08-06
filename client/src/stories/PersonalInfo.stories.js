import React from 'react';
import { action } from '@storybook/addon-actions';
import PersonalInfoForm from '../components/forms/PersonalInfoForm.js';

export default {
  title: 'PersonalInfo',
  component: PersonalInfoForm,
};

export const PersonalInfo = () => <PersonalInfoForm onUpdate={action('Update Received')} />;
export const setPersonalInfo = () => <PersonalInfoForm onUpdate={action('Update Received')} data={{
  first_name: "Arpita",
  last_name: "Deb",
  prof_title: "Junior Developer",
  email: "arpi@gmail.com",
  linkedIn: "http:linkedin/arpi",
  phone_number: "3062",
  address_line1: "Las Terrace",
  city: "Ottawa",
  province: "Ontario",
  postal_code: "K1J8N1"
}} />;