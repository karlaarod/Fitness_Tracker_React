import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import {
  NavBar,
  Routines,
  Activities,
  Dashboard,
  Account,
  CreateRoutines,
  CreateActivities,
  MyRoutines,
  UpdateRoutine,
  AttachActivitiesToRoutines,
} from ".";

import { callApi } from "../api";

const fetchUserData = async (token) => {
  const data = await callApi({
    url: "users/me",
    token,
  });

  return data;
};

const fetchActivities = async () => {
  const data = await callApi({
    url: "activities",
  });
  return data;
};

const fetchRoutines = async () => {
  const routines = await callApi({
    url: "routines",
  });
  return routines;
};

const fetchMyRoutines = async (username, token) => {
  const routines = await callApi({
    url: `users/${username}/routines`,
    token,
  });
  return routines;
};

// const fetchMyActivities = async (username, token) => {
//   const activities = await callApi({
//     url: `users/${username}/activities`,
//     token,
//   });
//   return activities;
// }; 

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [myActivities, setMyActivities] = useState([]);


  useEffect(async () => {
    const activities = await fetchActivities();
    const routines = await fetchRoutines();

    if (activities || routines) {
      setActivities(activities);
      setRoutines(routines);
    }
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    const username = data.username;
    const myRoutines = await fetchMyRoutines(username, token);
    // const myActivities = await fetchMyActivities(username, token);

    if (token) {
      setUserData(data);
      console.log("logged in username for routines is:", username);
      setMyRoutines(myRoutines);
      // setMyActivities(myActivities)
    }
  }, [token]);
  console.log(`Token is: ${token}`);
  console.log("userData for logged in user:", userData);
  // console.log("All activities are:", activities);
  // console.log("All Routines:", routines);
  console.log("My routines are:", myRoutines);
  console.log("My activities are:", myActivities);


  return (
    <>
      <h2>Welcome {userData.username}</h2>
      <NavBar
        userData={userData}
        setToken={setToken}
        setUserData={setUserData}
      />
      <Route path="/dashboard">
        <Dashboard userData={userData} token={token} />
      </Route>
      <Route path="/login">
        <Account action="login" setToken={setToken} />
      </Route>
      <Route path="/register">
        <Account action="register" setToken={setToken} />
      </Route>
      <Route path="/routines">
        <Routines routines={routines} userData={userData} />
      </Route>
      <Route path="/update-routine/:routineId">
        <UpdateRoutine
          routines={routines}
          userData={userData}
          token={token}
          myRoutines={myRoutines}
          setMyRoutines={setMyRoutines}
        />
      </Route>
      <Route path="/my-routines">
        <MyRoutines
          myRoutines={myRoutines}
          userData={userData}
        />
      </Route>
      <Route path="/activities">
        <Activities activities={activities} userData={userData} />
      </Route>
      <Route path="/create-routine">
        <CreateRoutines
          token={token}
          userData={userData}
          myRoutines= {myRoutines}
          setMyRoutines= {setMyRoutines}
        />
      </Route>
      <Route path="/create-activity">
        <CreateActivities 
        token={token} 
        userData={userData}
        activities = {activities}
        setActivities = {setActivities} 
        />
      </Route>
      <Route path="/add-activity/:routineId">
        <AttachActivitiesToRoutines
        myRoutines ={myRoutines}
        activities={activities}
          token={token}
          userData={userData}
          myRoutines= {myRoutines}
          setMyRoutines={setMyRoutines}
          setMyActivities = {setMyActivities}
        />
      </Route>
    </>
  );
};

export default App;
