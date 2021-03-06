import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import {Button, Checkbox, FormControlLabel, Paper, Card} from "@material-ui/core";

const UpdateRoutines = ({ token, userData, myRoutines, setMyRoutines }) => {
  let { routineId } = useParams();
  routineId = parseInt(routineId, 10);
  const routine = myRoutines.find((routine) => routineId === routine.id);


  console.log("MY ROUTINES WITHIN UPDATE:", myRoutines);
  console.log("routineId", routine)
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  //   const [activity, setActivity] = useState([]);
  const history = useHistory();

  console.log("const routine is:", routine)

  const handleDelete = async (event) => {
    event.preventDefault();

    const data = await callApi({
      url: `/routines/${routineId}`,
      token: token,
      method: "DELETE",
    });
    console.log("data deleted", data);

    if (data && data.success) {
      alert("Post Deleted!");
      history.push("/dashboard");
      setMyRoutines([...myRoutines, data])

    } else {
      alert(Error);
      history.push("/dashboard");
    }
  };

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
  if(!routine){
    return null
  }
  return (
    <>
          <h2>Update Routine</h2>

      <div className="update-form">
        <form onSubmit={handleUpdate}>
        <Card  >
          <div>
            <Textfield
              type="text"
              variant="filled"
              placeholder={routine.name}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <Textfield
              type="text"
              variant="filled"
              placeholder={routine.goal}
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
              }}
            />
            <FormControlLabel control={
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
          <Button variant="outlined" color="primary" onClick={handleDelete}>Delete</Button> 
          </Card>
        </form>
      </div>
    </>
  );
};

export default UpdateRoutines;
