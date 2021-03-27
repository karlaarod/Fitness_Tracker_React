
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
  const { data } = await callApi({
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

const fetchRoutines = async() => {

  const data = await callApi({
    url: "/routines",
  })
  return data;
}

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines ]= useState([])


  useEffect(async () => {
    const activities = await fetchActivities();
    if (activities){
      setActivities(activities);
    }
    const routines = await fetchRoutines();
      if (routines){
        setRoutines(routines);
      }
    if (!token) {
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(false)
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
  }, [token]);
  console.log(`Token is: ${token}`);
  console.log("userData", userData);
  console.log('activities', activities)
  // console.log('routines', routines)


  
  return (
    <>
      <h3>This is inside the app container</h3>
      <NavBar 
        userData= {userData} 
        setToken={setToken} 
        setUserData={setUserData} />
      <Route path = "/routines">
      <Routines 
      routines = {routines}
      />
      </Route>
      <Route path ="/activities">

      <Activities 
      activities= {activities}
      />
      </Route>
      <Route path = "/dashboard">
      <Dashboard />
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