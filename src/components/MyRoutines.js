import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const MyRoutines = ({ myRoutines, userData }) => {
  console.log("MY routines within MyRoutines component", myRoutines);
  const history = useHistory();

  if (!userData.id) {
    return (
      <div className="sign-in-message">
        <h1>
          Please <Link to="/login">log in</Link> to view your routines
        </h1>
      </div>
    );
  }

  return (
    <>
      <h3>My Routines</h3>
      <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push("/create-routine");
              }}
            >
              Create New Routine
            </Button>
      <div className="routines-list">
        {myRoutines ? (
          myRoutines.map(({ id, name, goal, creatorName, activities }) => (
            <div key={id} className="routine">
              <h4>{name}</h4>
              <div> Created by: {creatorName}</div>
              <div> Goal: {goal}</div>
              {activities
                ? activities.map(
                    ({ id, name, description, duration, count }) => (
                      <div key={id}>
                        <ol>
                          {" "}
                          <li>Activities {name}: </li>{" "}
                        </ol>
                        <ul>
                          <li>Description: {description}</li>
                          <li>Duration: {duration}</li>
                          <li>Count: {count} </li>
                        </ul>
                      </div>
                    )
                  )
                : null}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  history.push(`update-routine/${id}/`);
                  console.log(
                    "ROUTINE ID:",
                    id,
                    "ROUTINE NAME:",
                    name,
                    "ROUTINE GOAL:",
                    goal,
                    "ROUTINE CREATOR NAME:",
                    creatorName
                  );
                }}
              >
                Edit Routine
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  history.push(`/add-activity/${id}`);
                }}
              >
                Add Activity
              </Button>
            </div>
          ))
        ) : (
          <>
            <h2>No Routines</h2>

          </>
        )}
      </div>
    </>
  );
};
export default MyRoutines;
