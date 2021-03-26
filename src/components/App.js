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
  const [isLoggedin, setIsLoggedIn] = useState(false);
  // const [activities, setActivities] = useState([]);

  useEffect(async () => {
    if (!token) {
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(false);
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
    const posts = await fetchPosts();
    setPosts(posts);
    console.log("Posts:", posts);
  }, [token]);
  console.log(`Token is: ${token}`);

  console.log("userData", userData);

  return (
    <>
      <h3>This is inside the app container</h3>
      <NavBar
        userData={userData}
        setUserData={setUserData}
        setToken={setToken} />
      <Routines />
      <Activities />
      <Dashboard />
      <Route path="/login">
        <Account action="login" setToken={setToken} />
      </Route>
      <Route path="/register">
        <Account action="register" setToken={setToken} />
      </Route>
    </>
  );
};

export default App;
