import React, { useState, useReducer, useEffect, useContext } from 'react';
import {Nav} from "react-bootstrap";

const tabs = [ 'Summary', 'PersonalInfo', 'Education', 'CoreCompetencies', 'Experience', 'Reference' ];

const LeftSidebar = ({page, setPage}) => {
  const renderTabs = tabs.map((tab) => {
    return (
      <div className={tab === page ? " sidebar_item active" : "sidebar_item"} onClick={() => setPage(tab)}>
        {tab}
      </div>
    )
  })
  return (
    <div className="sidebar">
      {renderTabs}
    </div>
  );
}

export default LeftSidebar;
