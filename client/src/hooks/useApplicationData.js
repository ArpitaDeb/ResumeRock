import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const [state, setState] = useState({ users: [] });

  useEffect(() => {

    axios({
      method: 'GET',
      url: '/users'
    })
      .then(result => setState(prev => ({ ...prev, users: result.data })))
      .catch(err => console.log(err));

  }, [])

  return {
    state,
    setState
  }

}

export default useApplicationData;