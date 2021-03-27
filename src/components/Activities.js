import React from "react";

const Activities = ( {activities} ) => {


//   console.log ('activities.js', activities)

// return an array of activities created

  return (<>
    <h2>Activities</h2>

<div className= "activites-list">
{/* if activities exist map over and display activity name and description. 
If no activities, display message */}

     { activities ? (
                activities.map(( activity ) => (
                    <div key= {activity.id} className= 'activity'>
                <h4>{activity.name}</h4>
                <div>Description: {activity.description} </div>
                    </div>
                    ))
                ) : (
                    <h5>No activites to display</h5>
            )}
    </div>
  
  </>);

};

export default Activities;
