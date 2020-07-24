import React, {useState} from 'react';
import useApplicationData from './hooks/useApplicationData';
import './App.css';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import PersonalInfo from './components/tabs/PersonalInfo';
import Summary from './components/tabs/Summary';

function App() {
  const [ page, setPage ] = useState("");
  const { state, setState } = useApplicationData();
  //const userList = state.users.map(user => <li key={user.id}> {user.name} {user.email}</li>)

  return (
    <div>
      <LeftSidebar page={page} setPage={setPage} />
      {page=== "PersonalInfo" && <PersonalInfo /> }
      {page=== "Summary" && <Summary/> }
    </div>
  );
}

export default App;