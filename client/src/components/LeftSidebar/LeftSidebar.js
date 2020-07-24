import React, { useState, useReducer, useEffect, useContext } from 'react';
import Summary from '../tabs/Summary';

const tabs = [ 'Summary', 'PersonalInfo' ];

function reducer(state, action) {

}
const LeftSidebar = ({page, setPage}) => {
  const renderTabs = tabs.map((tab) => {
    return (
      <div className={tab === page ? "tab active" : "tab"} onClick={() => setPage(tab)}>
        {tab}
      </div>
    )
  })
  return (
    <div className="leftSidebar">
      {renderTabs}
    </div>
  );
}

export default LeftSidebar;
