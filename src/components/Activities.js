import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Activities = ( {activities} ) => {
  const history = useHistory();

//   console.log ('activities.js', activities)


  return (<>
    <h2>Activities</h2>

<div className= "activites-list">
     { activities ? (
                activities.map(( activity ) => (
                    <div key= {activity.id} className= 'activity'>
                <h4>{activity.name}</h4>
                <div>Description: {activity.description} </div>
                {/* <button
                    onClick={() => {
                    histor .push(`/activities/${activity.id}`);
                    }}>View Activity</button> */}
                    </div>
                    ))
                ) : (
                    <h5>No activites to display</h5>
            )}
    </div>
  
  </>);

};

export default Activities;
