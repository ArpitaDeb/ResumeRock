
import React from 'react';
import FormContainer from "../components/FormContainer";
import { action } from '@storybook/addon-actions';
import SummaryForm from "../components/forms/SummaryForm";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";

export default {
  title: 'FormContainer',
  component: FormContainer,
};

export const SummaryInContainer = () =>
  <FormContainer title="Summary" >
    <SummaryForm data={{ heading: "Summary", body: "Experienced customer relationship professional " }} onUpdate={action('Update Received')} />
  </FormContainer>

export const PersonalInfoInContainer = () =>
  <FormContainer title="Personal Information" >
    <PersonalInfoForm data={{
      firstName: "",
      lastName: "",
      profTitle: "",
      email: "",
      linkedIn: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      formGridcity: "",
      formGridProvince: "",
      formGridZip: ""
    }} onUpdate={action('Update Received')} />
  </FormContainer>
