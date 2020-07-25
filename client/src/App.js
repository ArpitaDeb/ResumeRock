import React, {useState} from 'react';
import useApplicationData from './hooks/useApplicationData';
import './App.css';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import PersonalInfo from './components/tabs/PersonalInfo';
import Summary from './components/tabs/Summary';
import Education from './components/tabs/Education';
import CoreCompetencies from './components/tabs/CoreCompetencies';
import Experience from './components/tabs/Experience';
import Reference from './components/tabs/Reference';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ page, setPage ] = useState("");
  const { state, setState } = useApplicationData();
  //const userList = state.users.map(user => <li key={user.id}> {user.name} {user.email}</li>)

  return (
    <div className="wrapper">
      <LeftSidebar page={page} setPage={setPage} />
      {page=== "PersonalInfo" && <PersonalInfo /> }
      {page=== "Summary" && <Summary/> }
      {page=== "Education" && <Education/> }
      {page=== "CoreCompetencies" && <CoreCompetencies/> }
      {page=== "Experience" && <Experience/> }
      {page=== "Reference" && <Reference/> }
    </div>
  );
}

export default App;