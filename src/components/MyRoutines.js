import React from "react";
import { Link, useHistory } from "react-router-dom";
import { UpdateRoutine } from ".";

const MyRoutines = ({ myRoutines, userData }) => {
  console.log("MY routines within MyRoutines component", myRoutines);
  const history = useHistory();

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

      <h3>My Routines</h3>
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
              <button
                onClick={() => {
                  history.push("/update-routine");
                }}
              >
                Edit Routine
              </button>
            </div>
          ))
        ) : (
          <h5>No routines to display</h5>
        )}
      </div>
    </>
  );
};
export default MyRoutines;
