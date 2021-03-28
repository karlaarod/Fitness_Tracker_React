import React, { useState } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const UpdateRoutines = ({ token, userData}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  //   const [activity, setActivity] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/routines/${routine.id}`,
      body: { name, goal, isPublic },
      method: "PATCH",
      token,
    });
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
              placeholder="Routine Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <Textfield
              type="text"
              placeholder="Routine Goal"
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
