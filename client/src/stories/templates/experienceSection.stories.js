
import React from 'react';
import ExperienceSection from "../../components/templates/customerService/ExperienceSection";

export default {
  title: 'ExperienceSection',
  component: ExperienceSection,
};

  const sampleData = {
    heading: 'Professional Experience',
    experiences: [
      {
        "employer_name": "YYZ INC.",
        "employer_description":"YYZ Inc. is a residential, business, and wholesale telecommunications company.",
        "job_title": "Customer Service Agent",
        "start_date": new Date("2018-02-01T05:00:00.000Z"),
        "end_date": "",
        "present": true,
        "city": " Toronto",
        "country": "Canada",
        "responsibilities": [
          " Effectively communicating with customers using customer friendly and appropriate language to explain customer bills, payment issues and handling sales and billing disputes consistent with company's standards.",
          "Maintaining professionalism and confidentiality while obtaining important information such as social insurance numbers, credit card information and properly documenting all calls."
        ],
        "achievements": [
          "Fulfilled customer requests by actively listening and clarifying desired information leading to thousands of completed transactions.",
          "Sold additional services by recognizing opportunities to upsell accounts as well as explaining new features and benefits to both existing and prospective customers.",
          "Demonstrated a strong record of accomplishment for working collaboratively on cross-functional & cross-cultural teams."
        ]
      }
    ]
  }

export const Filled = () => <ExperienceSection heading={sampleData.heading} experiences={sampleData.experiences} />;
