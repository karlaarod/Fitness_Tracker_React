import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  useHistory
} from "react-router-dom";
import Button from "@material-ui/core/Button";

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
  UpdateRoutinesActivities
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


const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const history = useHistory();


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


    if (token) {
      setUserData(data);
      console.log("logged in username for routines is:", username);
      setMyRoutines(myRoutines);
    }
  }, [token]);
  console.log(`Token is: ${token}`);
  console.log("userData for logged in user:", userData);
  // console.log("All activities are:", activities);
  // console.log("All Routines:", routines);
  console.log("My routines are:", myRoutines);


  return (
    <>

      
      <NavBar
        userData={userData}
        setToken={setToken}
        setUserData={setUserData}
      />
      
      <Route exact path="/">
      {userData.username? (
        <>
    
       <h1>Fitness Tracker</h1>
       <h2>Welcome {userData.username}</h2>
        <Button type="submit" variant="outlined" color="primary"
        onClick ={()=>{
          history.push(`/routines`);
        }}
        >Explore</Button>
        </>
        ) : 
        (
          <>
          <h1>Fitness Tracker</h1>
        <Button type="submit" variant="outlined" color="primary"
        onClick ={()=>{
          history.push(`/routines`);
        }}
        >Explore</Button>
        </>
        )
        }
        </Route>
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
        />
      </Route>
      <Route path="/edit-routine-activities/:routineActivityId">
        <UpdateRoutinesActivities
        token = {token}
        myRoutines = {myRoutines}
        setMyRoutines = {setMyRoutines}
        />
      </Route>
    </>
  );
};

export default App;
