import React, { useState } from "react";
// import { useHistory, Redirect } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CreateRoutines = ({ token, userData }) => {
  // const history = useHistory();
  // const redirectSubmit = history.push("/create-error");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
//   const [activity, setActivity] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: "routines",
      body: {name, goal, isPublic},
      method: "POST",
      token
    });
    console.log("New Routine:", data);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <Textfield
              type="text"
              placeholder="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <Textfield
              type="text"
              placeholder="goal"
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) =>
                    setIsPublic(event.currentTarget.checked)
                  }
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
// if (!userData.id){return <Redirect to={"/create-error"}/>}else
// {  }

export default CreateRoutines;