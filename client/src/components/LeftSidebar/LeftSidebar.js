import React, { useState, useReducer, useEffect, useContext } from 'react';


const tabs = [ 'Summary' ];

function reducer(state, action) {

}
const LeftSidebar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ currentTab, setCurrentTab ] = useState('');
  return (
    <div>
      
    </div>
  );
}

export default LeftSidebar;
