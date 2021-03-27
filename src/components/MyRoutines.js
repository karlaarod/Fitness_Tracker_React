import React from "react";
import { Link, useHistory } from "react-router-dom";

const MyRoutines = ({ myRoutines}) => {
  console.log("MY routines within MyRoutines component", myRoutines);



  return (
    <>
      <h3> My Routines</h3>
      <div className="routines-list">
        {myRoutines ? (
          myRoutines.map((routine) => (
            <div key={routine.id} className="routine">
              <h4>{routine.name}</h4>
              <div> Created by: {routine.creatorName}</div>
              <div> Goal: {routine.goal}</div>
            </div>
          ))
        ) : (
          <h5>You haven't made any routines</h5>
        )}
      </div>
    </>
  );
};

export default MyRoutines;
