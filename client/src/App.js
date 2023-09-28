// import EventList from "./components/EventList";
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';



function App() {

  const[user, setUser] = useState(null);

  useEffect(() => {
    console.log("Checking session...")
    fetch("/check_session")
    .then(resp => {
      if (resp.ok) {
        console.log("Check session found user.")
        resp.json().then(user => setUser(user))
      } else {
        console.log(`Check session failed to find user. Status code ${resp.status}`)
      }
    })
  }, [])

  return (
    <>
      <Header user={user}/>
      <Outlet context={{user, setUser}}/>
    </>
  );
}

export default App;
