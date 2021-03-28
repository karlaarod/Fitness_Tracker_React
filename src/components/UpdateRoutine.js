import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const UpdateRoutines = ({ token, userData, myRoutines }) => {
  const { routineId } = useParams();
  const routine = myRoutines.find((routine) => routineId === routine.id);
  console.log("MY ROUTINES WITHIN UPDATE:", myRoutines);
  console.log("routineId", routineId)
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  //   const [activity, setActivity] = useState([]);
  const history = useHistory();

  // console.log("ROUTINE ID FROM USE PARAMS:", routineId ,"ROUTINE NAME FROM SINGLE ROUTINE VARIABLE:", routine.name);
  console.log("routine const:", routine)

  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `routines/${routineId}`,
      body: { name, goal, isPublic },
      method: "PATCH",
      token,
    });
    history.push("/dashboard");
  };

  if (!userData.id) {
    return (
      <div className="sign-in-message">
        <h1>
          Please <Link to="/login">log in</Link> to update a routine
        </h1>
      </div>
    );
  }

  //   if(userData.id === routine.creatorId){}
  return (
    <>
      <div>
        <form onSubmit={handleUpdate}>
          <div>
            <Textfield
              type="text"
              placeholder="NAME"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <Textfield
              type="text"
              placeholder="GOAL"
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => setIsPublic(event.currentTarget.checked)}
                />
              }
              label="Check if you wish this routine to be public"
              labelPlacement="start"
            />
          </div>
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateRoutines;
