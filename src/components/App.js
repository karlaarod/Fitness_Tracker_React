import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Link,
} from "react-router-dom";
import { NavBar, Routines, Activities, Dashboard, Account } from ".";

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  // const [routines, setRoutines] = useState([]);

  return (
    <>
      <h3>This is inside the app container</h3>
      <NavBar />
      <Routines />
      <Activities />
      <Dashboard />
      {/* <Route path="/login"> */}
        <Account action="login" setToken={setToken} setUserData={setUserData} />
      {/* </Route>
      <Route path="/register"> */}
        <Account
          action="register"
          setToken={setToken}
          setUserData={setUserData}
        />
      {/* </Route> */}
    </>
  );
};

export default App;
