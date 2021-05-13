import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Paper} from "@material-ui/core";


const Activities = ({ activities, userData }) => {
  const history = useHistory();
  console.log('results from activities', activities)

  return (
    <>
      <h1>Activities</h1>
      <div className="activites-list">
      <div>
        {userData.id ? (
          <Button type="submit" 
          variant="contained" color="default"
          className="activities-routines-button"
            onClick={() => {
              history.push("/create-activity");
            }}
          >
            Create New Activity
          </Button>
        ) : (
          ""
        )}
      </div>
        {/* if activities exist map over and display activity name and description. 
        If no activities, display message */}

        {activities ? (
          activities.map((activity) => (
            <div key={activity.id} className="activity">
              <div className="activity-details">
              <h4>{activity.name}</h4>
              <div>Description: {activity.description} </div>
              </div>
            </div>
          ))
        ) : (
          <h5>No activites to display</h5>
        )}
      </div>
    </>
  );
};
export default Activities;
