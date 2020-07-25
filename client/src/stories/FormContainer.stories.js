
import React from 'react';
import FormContainer from "../components/FormContainer";
import { action } from '@storybook/addon-actions';
import SummaryForm from "../components/forms/SummaryForm";

export default {
  title: 'FormContainer',
  component: FormContainer,
};

export const SummaryInContainer = () =>
  <FormContainer title="Summary" >
    <SummaryForm data={{ heading: "Summary", body: "Experienced customer relationship professional "}} onUpdate={action('Update Received')} />
  </FormContainer>
