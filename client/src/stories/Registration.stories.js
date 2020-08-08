import React from 'react';
import { action } from '@storybook/addon-actions';
import Registration from "../components/userLR/Registration";

export default {
  title: 'Registration',
  component: Registration,
};

export const Register = () =>
  <Registration onUpdate={action('Update Received')} />;
