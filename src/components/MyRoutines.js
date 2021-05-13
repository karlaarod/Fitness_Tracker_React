import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const MyRoutines = ({ myRoutines, userData }) => {
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

  if (!myRoutines) {
    return null;
  }

  return (
    <>
      <h1>My Routines</h1>
      <Button
          className="activities-routines-button"

        onClick={() => {
          history.push("/create-routine");
        }}
      >
        <AddIcon/>
        Create Routine
      </Button>
      <div className="my-routines-list">

        {myRoutines ? (
          myRoutines.map(
            ({
              id,
              name,
              goal,
              creatorName,
              activities,
            }) => (
              <div key={id} className="my-routine">
              <div className="my-routine-details">
                <h4>{name}</h4>
                <div> Created by: {creatorName}</div>
                <div> Goal: {goal}</div>
                </div>
                <div className="my-routine-buttons">
                <Button
                  variant="inherit"
                  color="primary"
                  onClick={() => {
                    history.push(`update-routine/${id}/`);
                  }}
                >
                  Edit Routine
                </Button>
                <Button
                  variant="inherit"
                  color="primary"
                  onClick={() => {
                    history.push(`/add-activity/${id}`);
                  }}
                >
                  Add Activity
                </Button>
                </div>
                <div className="my-routine-activities">
                {activities
                  ? activities.map(
                      ({
                        id,
                        name,
                        description,
                        duration,
                        count,
                        routineActivityId,
                      }) => (
                        <div key={id} className="my-routine-details">
                        <h4>Routine Activity: {name} </h4>
                          <ul>
                          <li>Description: {description}</li>
                          <li>Duration: {duration}</li>
                          <li>Count: {count} </li>
                        </ul>
                        <div className="my-activity-button">
                          <Button
                            variant="inherit"
                            color="primary"
                            onClick={() => {
                              history.push(
                                `/edit-routine-activities/${routineActivityId}`
                              );
                            }}
                          >
                            Edit Activity
                          </Button>
                        </div>
                        </div>
                      )
                    )
                  : null}
                  </div>
              </div>
            )
          )
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
