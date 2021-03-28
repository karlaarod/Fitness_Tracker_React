import React from "react";
import { Link, useHistory } from "react-router-dom";

const Dashboard = ({ userData }) => {
  const history = useHistory();
  if (!userData.id) {
    return (
      <div className="sign-in-message">
        <h1>
          Please <Link to="/login">log in</Link> to view your dashboard
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="dashboard">{<h1>Hello, {userData.username}!</h1>}</div>
      <h3> this is the Dashboard page</h3>
      <button
        onClick={() => {
          history.push("/my-routines");
        }}
      >
        My Routines
      </button>
      <button
        onClick={() => {
          history.push("/create-routine");
        }}
      >
        Create New Routine
      </button>
      <button
        onClick={() => {
          history.push("/create-activity");
        }}
      >
        Create New Activity
      </button>
    </>
  );
};
export default Dashboard;
