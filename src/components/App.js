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

const fetchUserData = async (token) => {
  const { data } = await callApi({
    url: "/users/me",
    token,
  });
  return data;
};

// const fetchActivities = async () => {
//   const {
//     data: { activities},
//   } = await callApi({
//     url: "/activities",
//   });
//   return activities;
// };

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  // const [activities, setActivities] = useState([]);

  useEffect(async () => {
    // const activitiess = await fetchActivities();
    // if (activities){ 
    //   setActivities(activities);
    // }
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }}, [token]);



  return (
    <>
      <h3>This is inside the app container</h3>
      <NavBar />
      <Routines />
      <Activities />
      <Dashboard />

      <Route path="/login">
        <Account 
          action="login" 
          setToken={setToken} 
          setUserData={setUserData} />
      </Route>
      <Route path="/register">
        <Account
          action="register"
          setToken={setToken}
          setUserData={setUserData}
        />
      </Route>

     
    </>
  );
};

export default App;
