import React from 'react';
import useApplicationData from './hooks/useApplicationData';
import './App.css';

function App() {

  const { state, setState } = useApplicationData();


  const userList = state.users.map(user => <li key={user.id}> {user.name} {user.email}</li>)

  return (
    <>
      <h1>Users</h1>

      <ul>
        {userList}
      </ul>

    </>
  );
}

export default App;