import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const AttachActivitiesToRoutines = ({
  routines,
  token,
  userData,
  setRoutines,
  activities,
}) => {
  const [isPublic, setIsPublic] = useState(false);
  const [activity, setActivity] = useState([]);
  const history = useHistory();

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: "routines",
      body: { activityId, count, duration },
      method: "POST",
      token,
    });
    history.push("/my-routines");
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
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AttachActivitiesToRoutines;
