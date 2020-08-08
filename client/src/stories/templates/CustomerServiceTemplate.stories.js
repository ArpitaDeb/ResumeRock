
import React from 'react';
import CustomerServiceTemplate from "../../components/templates/customerService/CustomerServiceTemplate";
import { data } from "../../components/templates/customerService/data"

export default {
  title: 'CustomerServiceTemplate',
  component: CustomerServiceTemplate,
};

const data1 = {
  core_competencies: {
    skills: [
      {
        name: "Customer service",
        rating: "5"
      },
      {
        name: "Excellent communicator",
        rating: "5"
      },
      {
        name: "Notable interpersonal skills",
        rating: "5"
      },
      {
        name: "B2C sales and marketing",
        rating: "5"
      },
      {
        name: "Administrative support",
        rating: "5"
      },
      {
        name: "Microsoft Office Suite",
        rating: "5"
      }
    ]
  },
}


export const filled = () => <CustomerServiceTemplate data={data} />;

export const empty = () => <CustomerServiceTemplate />;

export const withSomeInfo = () => <CustomerServiceTemplate data={data1} />;