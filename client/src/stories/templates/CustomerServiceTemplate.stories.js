
import React from 'react';
import CustomerServiceTemplate from "../../components/templates/customerService/CustomerServiceTemplate";
import {data} from "../../components/templates/customerService/data"

export default {
  title: 'CustomerServiceTemplate',
  component: CustomerServiceTemplate,
};



export const filled = () =><CustomerServiceTemplate data={data} />;

export const empty = () =><CustomerServiceTemplate />;