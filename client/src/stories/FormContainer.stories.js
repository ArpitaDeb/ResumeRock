
import React from 'react';
import FormContainer from "../components/FormContainer";
import { action } from '@storybook/addon-actions';
import SummaryForm from "../components/forms/SummaryForm";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import EducationForm from "../components/forms/EducationForm";
import CoreCompetencyForm from "../components/forms/CoreCompetencyForm";
import ReferenceForm from "../components/forms/ReferenceForm";
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

export const EducationInContainer = () =>
  <FormContainer title="Education" >
    <EducationForm data={{ heading: "Education" }} onUpdate={action('Update Received')}
      onEducationChange={action('Education added')}
      onHeadingChange={action('heading added')} />
  </FormContainer>
export const CoreCompetencyInContainer = () =>
  <FormContainer title="CoreCompetency" >
    <CoreCompetencyForm data={{ heading: "CoreCompetency" }} onUpdate={action('Update Received')} />
  </FormContainer>
export const ReferenceInContainer = () =>
  <FormContainer title="Reference" >
    <ReferenceForm data={{ heading: "Reference" }} onUpdate={action('Update Received')} />
  </FormContainer>
