import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

    // add activitiy to routines 


const AttachActivitiesToRoutines = ({
  activities,
  token,
  userData,
  myRoutines,
  setRoutines
}) => {
  const [activity, setActivity] = useState([]);
  const history = useHistory();
  const [duration, setDuration] = useState("");
  const [count, setCount] = useState("");

  
  const handleActivityChange = (event) => {
    setActivity(event.target.value);
    console.log('activities', setActivity(event.target.value))
  };

  const findActiviy = activities.filter((activity) => activity);
  console.log('activities', findActiviy)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const routine= myRoutines ? myRoutines.find((routine) => routine) : null;

    const data = await callApi({
      url: `/routine/${routine.id}/acitivities`,
      body: { activityId, count, duration },
      method: "POST",
      token,
    });
    history.push("/my-routines");

    //updates routines to include changes
    setRoutines([...routines])
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
                  type="text"
                  placeholder='Duration'
                  value={duration}
                  onChange={(event) => {
                    setDuration(event.target.value);
                  }}
                />
                <Textfield
                  type="text"
                  placeholder='Count'
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
