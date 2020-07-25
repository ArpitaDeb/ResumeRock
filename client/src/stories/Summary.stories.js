
import React from 'react';
import SummaryForm from "../components/forms/SummaryForm";
import { action } from '@storybook/addon-actions';

export default {
  title: 'Summary',
  component: SummaryForm,
};

export const Empty = () => <SummaryForm onUpdate={action('Update Received')}/>;
export const Filled = () => <SummaryForm onUpdate={action('Update Received')} heading="Summary" body="Experienced customer relationship professional offering demonstrated knowledge gained in telecommunications, finance, and retail services. Goal is to leverage work experience and strong background in customer service to enable effective operations for the company. Highly effective in developing rapport and building relationships with internal and external stakeholders."/>;