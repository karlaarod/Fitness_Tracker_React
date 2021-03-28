import React, { useState } from "react";
import { Link, useHistory  } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CreateRoutines = ({ token, userData }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  //   const [activity, setActivity] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: "routines",
      body: { name, goal, isPublic },
      method: "POST",
      token,
    });
    console.log("New Routine:", data);
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

export default CreateRoutines;
