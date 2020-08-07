import React from "react";
export default function ContactsSection(props) {


  return (
    <div>
      <h5 className="text-uppercase mb-2">
        Contacts
      </h5>
      <div className="ml-4">
        <div >{props.personal_info.address_line1}</div>
        <span>{props.personal_info.city}, <span className="text-uppercase">{props.personal_info.province}</span> {props.personal_info.postal_code}</span>
        <div className="mt-3 mb-3">
          {props.personal_info.phone_number}
        </div>
        {props.personal_info.email}
      </div>
    </div>
  );

}