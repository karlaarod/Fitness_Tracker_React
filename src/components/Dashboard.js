import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";


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
      <Button
                variant="outlined"
                color="primary"
        onClick={() => {
          history.push("/my-routines");
        }}
      >
        My Routines
      </Button>
      <Button variant="outlined" color="primary"
        onClick={() => {
          history.push("/create-routine");
        }}
      >
        Create New Routine
      </Button>
      <Button variant="outlined" color="primary"
        onClick={() => {
          history.push("/create-activity");
        }}
      >
        Create New Activity
      </Button>
    </>
  );
};
export default Dashboard;
