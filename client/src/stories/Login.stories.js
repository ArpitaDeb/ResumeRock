import React from 'react';
import { action } from '@storybook/addon-actions';
import Login from "../components/userLR/Login";

export default {
  title: 'Login',
  component: Login,
};

export const Empty = () =>
  <Login onUpdate={action('Update Received')} />;
