import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Link,
} from "react-router-dom";

import { NavBar, Routines, Activities, Dashboard, Account } from ".";

import { callApi } from "../api";

const fetchUserData = async (token) => {
  const  data  = await callApi({
    url: "users/me",
    token,
  });

  return data;
};

const fetchActivities = async () => {
  const data = await callApi({
    url: "/activities",
  });
  return data;
};

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(async () => {
    const activities = await fetchActivities();
    if (activities) {
      setActivities(activities);
    }
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    if (token) {
      setUserData(data);
    }
  }, [token]);
  console.log(`Token is: ${token}`);
  console.log("userData is:", userData);
  console.log("activities are:", activities);

  return (
    <>
      <h3>This is inside the app container</h3>
      <h2>Welcome {userData.username}</h2>
      <NavBar
        userData={userData}
        setToken={setToken}
        setUserData={setUserData}
      />
      <Route path="/routines">
        <Routines />
      </Route>
      <Route path="/activities">
        <Activities activities={activities} />
      </Route>
      <Route path="/dashboard">
        <Dashboard 
          userData = {userData}
          token = {token}/>
      </Route>
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
