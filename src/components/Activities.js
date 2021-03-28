import React from "react";
import { Link, useHistory } from "react-router-dom";
const Activities = ({ activities, userData }) => {
  const history = useHistory();

  return (
    <>
      <div>
        {userData.id ? (
          <button
            onClick={() => {
              history.push("/create-activity");
            }}
          >
            Create New Activity
          </button>
        ) : (
          ""
        )}
      </div>

      <h2>Activities</h2>

      <div className="activites-list">
        {/* if activities exist map over and display activity name and description. 
If no activities, display message */}

        {activities ? (
          activities.map((activity) => (
            <div key={activity.id} className="activity">
              <h4>{activity.name}</h4>
              <div>Description: {activity.description} </div>
              <button
                onClick={() => {
                  history.push("/update-activity");
                }}
              >
                Edit Activity
              </button>
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
