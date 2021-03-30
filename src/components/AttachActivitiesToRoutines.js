import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// add activity to routines

const AttachActivitiesToRoutines = ({
  myRoutines,
  activities,
  token,
  userData,
  setMyRoutines,
  setMyActivities
}) => {

  const [activity, setActivity] = useState({});
  const history = useHistory();
  const [duration, setDuration] = useState("");
  const [count, setCount] = useState("");

  let { routineId } = useParams();
  
  const activityId= 1; 

const routine = myRoutines ? myRoutines.find((routine) => Number(routineId) === Number(routine.id)) : null;
console.log('activities', activities)

  // console.log('routineID', routineId)

 
  const handleActivityChange = (event) => {
    setActivity(event.target.value);
    console.log('activity change', activity)
  };

  const findActivity= activities.find(({id}) => {
    Number(id) === Number(activity);
  })


  console.log('find activity ', findActivity )


  const handleSubmit = async (event) => {
    event.preventDefault();

    

    const data = await callApi({
      url: `/routines/${routineId}/activities`,
      body: { activityId, count, duration },
      method: "POST",
      token,
    });

    history.push("/my-routines");
    setMyRoutines([...myRoutines, data])
    // console.log("New Routines Activity:", data);
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
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
          <Textfield
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />
          <Textfield
            type="text"
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
