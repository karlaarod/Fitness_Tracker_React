import React, { useState } from "react";
import {useHistory, useParams } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const UpdateRoutinesActivities = ({
  token,
  myRoutines,
  setMyRoutines,
}) => {
  const history = useHistory();

  const [duration, setDuration] = useState("");
  const [count, setCount] = useState("");
  let { routineActivityId } = useParams();
  const [routineActivities, setMyRoutineActivities] = useState({});

  const handleDelete = async (event) => {
    event.preventDefault();

    const data = await callApi({
      url: `routine_activities/${routineActivityId}`,
      token: token,
      method: "DELETE",
    });
    console.log("data deleted", data);

    if (data && data.success) {
      alert("Post Deleted!");
      history.push("/dashboard");
      setMyRoutines([...myRoutines, data]);
    } else {
      alert(Error);
      history.push("/dashboard");
    }
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `routine_activities/${routineActivityId}`,
      body: { duration, count },
      method: "PATCH",
      token,
    });
    history.push("/dashboard");
    setMyRoutines([...myRoutines, data]);

  };

  if (!myRoutines) {
    return null;
  }

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div>
          <h2>Edit Activity</h2>
          <Textfield
            type="number"
            placeholder="New Duration"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />
        </div>
        <div>
          <Textfield
            type="number"
            placeholder="New Count"
            value={count}
            onChange={(event) => {
              setCount(event.target.value);
            }}
          />
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
          <Button variant="outlined" color="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push(`/my-routines`);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
export default UpdateRoutinesActivities;
