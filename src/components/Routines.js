import React from "react";
import { useHistory } from "react-router";

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
                <div className= "routine-body">
              <h4>{name}</h4>
              <div> Created by: {creatorName}</div>
              <div> Goal: {goal}</div>
              </div>
              {activities
                ? activities.map(
                    ({ id, name, description, duration, count }) => (
                      <span key={id} className="routine-activities">
                          {" "}
                          <li>Activities {name}: </li>{" "}
                        <ul>
                          <li>Description: {description}</li>
                          <li>Duration: {duration}</li>
                          <li>Count: {count} </li>
                        </ul>
                      </span>
                    )
                  )
                : null}
                <button onClick={() => {
                    history.push(`/routines/${id}`);
                    }}> View Routine</button>
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
