import React from 'react';
import { action } from '@storybook/addon-actions';
import PersonalInfoForm from '../components/forms/PersonalInfoForm.js';

export default {
  title: 'PersonalInfo',
  component: PersonalInfoForm,
};

export const PersonalInfo = () => <PersonalInfoForm onUpdate={action('Update Received')} />;
export const setPersonalInfo = () => <PersonalInfoForm onUpdate={action('Update Received')} data={{
  firstName: "Arpita",
  lastName: "Deb",
  profTitle: "Junior Developer",
  email: "arpi@gmail.com",
  linkedIn: "http:linkedin/arpi",
  phoneNumber: "3062",
  addressLine1: "Las Terrace",
  addressLine2: "Beaco hill",
  formGridcity: "Ottawa",
  formGridProvince: "Ontario",
  formGridZip: "K1J8N1"
}} />;