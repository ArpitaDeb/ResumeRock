import React from 'react';
import useApplicationData from './hooks/useApplicationData';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import Navigationbar from './components/Navigationbar';


function App() {

  return (
    <Router>
      <Navigationbar />
    </Router>
  );
}

export default App;