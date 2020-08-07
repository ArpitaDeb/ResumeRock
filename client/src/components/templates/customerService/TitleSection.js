import React from "react";
export default function TitleSection(props) {
  const personal_info= props.personal_info;
  if (personal_info === undefined) {
    return "";
  }
  else {
  return (
    <div className="text-uppercase pt-5 pb-4"  style={{textAlign: "center"}}>
      <h1 className="bold"> {personal_info.first_name} {personal_info.last_name}</h1>
      <h6 className="text-uppercase">
        {personal_info.prof_title}
      </h6>
    </div>
  );
}
}