import React from "react";
import { Link, useHistory } from "react-router-dom";

const Dashboard = ({ userData }) => {
    if (!userData.id) {
        return (
          <div className="sign-in-message">
            <h1>Please <Link to="/login">log in</Link> to view your dashboard</h1>
            
          </div>
        );
      }
  return (
    <>
      <div className="dashboard">{<h1>Hello, {userData.username}!</h1>}</div>
      <h3> this is the Dashboard page</h3>
    </>
  );
};
export default Dashboard;
