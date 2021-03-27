import React from "react";
import { Link, useHistory } from "react-router-dom";

const Routines = ({ routines }) => {
    console.log('routines', routines)

    
  return (<>
      <h3> Routines</h3>
      <div className="routines-list">
        {routines ? (
          routines.map((routine) => {
            <div key={routine.id} className="routine">
              <h4>{routine.name}</h4>
              <div> Created by: {routine.creatorName}</div>
              <div> Goal: {routine.goal}</div>
            </div>;
          })
        ) : (
          <h5>No routines to display</h5>
        )}
      </div>
    </>
  );
};

export default Routines;
