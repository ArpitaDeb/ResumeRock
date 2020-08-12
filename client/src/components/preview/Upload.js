import React from "react";

export function Upload(props) {

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      props.onFileImported(e.target.result);
    };
  };
  return (
    <>
      <h2 className="text-white my-3 bold">Upload Json file</h2>
      <input type="file" onChange={handleChange} />
    </>
  );
}
