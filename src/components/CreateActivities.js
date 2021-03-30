import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const CreateActivities = ({ token, userData, activities, setActivities }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && description) {
      history.push("/activities");
    }

    const data = await callApi({
      url: "/activities",
      body: { name, description },
      method: "POST",
      token,
    });

    setActivities([...activities, data]);
    history.push("/activities");
    console.log("NEW ACTIVITY", data);
  };
  if (!userData.id) {
    return (
      <div className="sign-in-message">
        <h1>
          Please <Link to="/login">log in</Link> to create a new activity
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
              placeholder="Activity Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <Textfield
              type="text"
              placeholder="Activity Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
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

export default CreateActivities;
