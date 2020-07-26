import React from 'react';
import LeftSidebar from "../components/LeftSidebar/LeftSidebar.js";
import { action } from '@storybook/addon-actions';
export default {
  title: 'LeftSidebar',
  component: LeftSidebar,
};
const items = [{
  title: 'PERSONAL INFO'
},
{
  title: 'SUMMARY'
},
{
  title: 'EDUCATION'
},
{
  title: 'CORE COMPETENCIES'
},
{
  title: 'EXPERIENCE'
},
{
  title: 'REFERENCE'
},
{
  title: 'CERTIFICATES'
}];
export const sidebar = () => <LeftSidebar onUpdate={action('Update Received')} items={items} />;