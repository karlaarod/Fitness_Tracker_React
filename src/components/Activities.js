import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Activities = ( {activities} ) => {
  const history = useHistory();

  console.log ('activities.js', activities)

  return (<>
    <h3>Activities</h3>

<div className= "activites-list">
     { activities ? (
                activities.map(( activity ) => (
                    <div key= {activity.id} className= 'activity'>
                <h5>{activity.name}</h5>
                <div>Description: {activity.description} </div>
                <button
                    onClick={() => {
                    history.push(`/activities/${activity.id}`);
                    }}>View Activity</button>
                    </div>
                    ))
                ) : (
                    <h5>No activites to display</h5>
            )}
    </div>
  
  </>);

};

export default Activities;
