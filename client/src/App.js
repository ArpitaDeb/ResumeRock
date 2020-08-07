import React from 'react';
import useApplicationData from './hooks/useApplicationData';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import Navigationbar from './components/Navigationbar';

function App() {
  const { state, setState } = useApplicationData();
  //const userList = state.users.map(user => <li key={user.id}> {user.name} {user.email}</li>)

  return (
    <Router>
      <Navigationbar />
    </Router>
  );
}

export default App;