// import EventList from "./components/EventList";
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useState, useEffect } from 'react';


function App() {

  const[user, setUser] = useState(null);

  useEffect(() => {
    console.log("Checking session...")
    fetch("/check_session")
    .then(resp => {
      if (resp.ok) {
        console.log("User found")
        resp.json().then(user => setUser(user))
      } else {
        console.log("No user found")
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
