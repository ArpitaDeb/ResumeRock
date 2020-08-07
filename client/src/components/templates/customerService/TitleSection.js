import React from "react";
export default function TitleSection(props) {

  return (
    <div className="text-uppercase pt-5 pb-4"  style={{textAlign: "center"}}>
      <h1 > {props.personal_info.first_name} {props.personal_info.last_name}</h1>
      <h6 className="text-uppercase">
        {props.personal_info.prof_title}
      </h6>
    </div>
  );

}