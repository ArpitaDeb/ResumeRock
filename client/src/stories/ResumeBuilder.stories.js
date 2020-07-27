
import React from 'react';
import FormContainer from "../components/FormContainer";
import { action } from '@storybook/addon-actions';
import SummaryForm from "../components/forms/SummaryForm";
import ResumeBuilder from "../components/ResumeBuilder";


export default {
  title: 'ResumeBuilder',
  component: ResumeBuilder,
};

export const Main = () => <ResumeBuilder/>