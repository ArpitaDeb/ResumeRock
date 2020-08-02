import React from "react";

export default function Preview(props) {
  const data = props.resumeData;
  const str=JSON.stringify(data, null, '\t')
  return (
    <pre>
      {`${str}`}
    </pre>
  )
}