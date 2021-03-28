import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ userData, setUserData, setToken }) => {
  console.log("user logged in ID:", userData.id);
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    setUserData({});
    setToken("");
    history.push("/");
  };
  return (
    <nav className="navbar">
      <div>{userData.id ? <Link to={"/dashboard"}>Dashboard</Link> : ""}</div>
      <div>
        <Link to={"/activities"}> Activities </Link>
      </div>
      <div>
          <Link to={"/routines"}>Routines</Link>
          </div>
      {/* <div>
      {userData._id ? (
        <Link to={"/create"}>Create</Link>
      ) : (
        <Link to={"/create-error"}></Link>
      )}
    </div> */}
      <div>
        {userData.id ? (<>
          <Link onClick={logOut} to="/">
            Log Out
          </Link>
          </>
        ) : (<>
          <Link to={"/login"}>Login/Register</Link>
        </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
