import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { callApi } from "../api";
import { UpdateRoutine } from ".";

const MyRoutines = ({ myRoutines, userData, token, setMyRoutines }) => {
  console.log("MY routines within MyRoutines component", myRoutines);
  const history = useHistory();
  const routine = myRoutines.find((routine) => routine);
  // console.log("MY routines id", routine);

  const handleDelete = async (event) => {
    event.preventDefault();

    const data = await callApi({
      url: `/routines/${routine.id}`,
      token: token,
      method: "DELETE",
    });
    if (data.success) {
      alert("Post Deleted!");
      history.push("/dashboard");
    } else {
      alert(Error);
    }
  };

  console.log("myroutines userdatea", userData);

  if (!myRoutines) {
    return <h5>No routines to display</h5>;
  }
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
              {activities ? (
                activities.map(({ id, name, description, duration, count }) => (
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
                ))
              ) : (
                null
              )}
              <button onClick={handleDelete}>Delete Routine</button>
              <button
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
