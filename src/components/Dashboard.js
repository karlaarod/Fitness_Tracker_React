import React from "react";
import { Link, useHistory } from "react-router-dom";

const Dashboard = ({ userData }) => {
  return (
    <>
      <div className="dashboard">{<h1>Hello, {userData.username}!</h1>}</div>
      <h3> this is the Dashboard page</h3>
    </>
  );
};
export default Dashboard;
