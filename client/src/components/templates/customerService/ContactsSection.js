import React from "react";
export default function ContactsSection(props) {
  const data = props.personal_info;

  if (!data.address_line1 && !data.city && !data.province && !data.phone_number && !data.postal_code && !data.email) {
    return ""
  } else {
    return (
      <div>
        <h5 className="text-uppercase bold mb-2">
          Contacts
      </h5>
        <div className="ml-4">
          <div >{data.address_line1}</div>
          <span>{data.city}{(data.city && data.province) ? ",":""} <span className="text-uppercase">{data.province}</span> {data.postal_code}</span>
          <div className="mt-3 mb-3">
            {data.phone_number}
          </div>
          {data.email}
        </div>
      </div>
    );
  }
}