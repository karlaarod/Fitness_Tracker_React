import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


// add activity to routines

const AttachActivitiesToRoutines = ({
  myRoutines,
  activities,
  token,
  userData,
  setMyRoutines,
}) => {
  const [activity, setActivity] = useState({});
  const history = useHistory();
  const [duration, setDuration] = useState("");
  const [count, setCount] = useState("");
  const [routineActivities, setMyRoutineActivities] = useState({});

  let { routineId } = useParams();


const singleRoutine = myRoutines
    ? myRoutines.find((routine) => Number(routineId) === Number(routine.id))
    : null;


  const singleActivity = activities.find((item) => item.name === activity);
  // console.log("single activity", singleActivity);

  const activityId= singleActivity? singleActivity.id : null ;


  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await callApi({
      url: `/routines/${routineId}/activities`,
      body: { activityId, count, duration },
      method: "POST",
      token,
    });

    history.push("/dashboard");
    setMyRoutines([...myRoutines])
    setMyRoutineActivities([...singleRoutine.activities, data]);
    console.log("New Routines Activity:", data);
  };

  if (!userData.id) {
    return (
      <div className="sign-in-message">
        <h1>
          Please <Link to="/login">log in</Link> to create a new routine
        </h1>
      </div>
    );
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <select onChange={handleActivityChange}>
              <option value="⬇️Select activity to add⬇️">
                --⬇️Select an activity to add⬇ --
              </option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
          <Textfield
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />
          <Textfield
            type="number"
            placeholder="Count"
            value={count}
            onChange={(event) => {
              setCount(event.target.value);
            }}
          />
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AttachActivitiesToRoutines;
