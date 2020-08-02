import React from 'react';
import useApplicationData from './hooks/useApplicationData';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResumeBuilder from './components/ResumeBuilder';

function App() {
  const { state, setState } = useApplicationData();
  const userList = state.users.map(user => <li key={user.id}> {user.name} {user.email}</li>)

  return (
    <>
      <ResumeBuilder />
    </>
  );
}

export default App;