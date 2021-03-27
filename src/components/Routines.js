import React from "react";
import { Link, useHistory } from "react-router-dom";

const Routines = ({ routines, userData }) => {
  const history = useHistory();

  console.log("routines", routines);
  const allActivities = routines.map((routine) => {
    return routine.activities;
  });
  console.log("routines activities", allActivities);
  return (
    <>
      <div>
        {userData.id ? (
          <button
            onClick={() => {
              history.push("/create-routine");
            }}
          >
            Create New Routine
          </button>
        ) : (
          ""
        )}
      </div>

      <h3> Routines</h3>
      <div className="routines-list">
        {routines ? (
          routines.map(({ id, name, goal, creatorName, activities }) => (
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
            </div>
          ))
        ) : (
          <h5>No routines to display</h5>
        )}
      </div>
    </>
  );
};
export default Routines;
