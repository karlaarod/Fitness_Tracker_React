import React from "react";
import { useHistory } from "react-router";
import { Button, Grid } from "@material-ui/core";


const Routines = ({ routines, userData }) => {
  const history = useHistory();

  console.log("routines", routines);
  const allActivities = routines.map((routine) => {
    return routine.activities;
  });
  console.log("routines activities", allActivities);
  return (
    <>
      <h1> Routines</h1>
      <div>
        {userData.id ? (
          <Button type="submit" variant="contained" color="default"
          className="activities-routines-button"
            onClick={() => {
              history.push("/create-routine");
            }}
          >
            Create New Routine
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="routines-list">
      <Grid
                container
                className="routines-grid"
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
        {routines ? (
          routines.map(({ id, name, goal, creatorName, activities }) => (
            <div key={id} className="routine">
              <div className="routine-body">
                <h4>{name}</h4>
                <div> Created by: {creatorName}</div>
                <div> Goal: {goal}</div>
              </div>
              <footer className="routine-activities-footer">
              {activities
                ?
                activities.map(
                    ({ id, name, description, duration, count }) => (
                      <span key={id} className="routine-activities">
                        <h4>Routine Activity: {name} </h4>
                        <ol>
                          <li>Description: {description}</li>
                          <li>Duration: {duration}</li>
                          <li>Count: {count} </li>
                        </ol>
                      </span>
                    )
                  )
                : ""}
                </footer>
            </div>
          ))
        ) : (
          <h5>No routines to display</h5>
        )}
        </Grid>
      </div>
    </>
  );
};
export default Routines;
