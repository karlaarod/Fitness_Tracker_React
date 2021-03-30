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
      <Link to={"/"}> Home </Link>
      {userData.id ? (
        <>
          <Link to={"/my-routines"}> My Routines </Link>
          <Link to={"/dashboard"}>Dashboard</Link>{" "}
        </>
      ) : (
        ""
      )}
      <Link to={"/activities"}> Activities </Link>
      <Link to={"/routines"}>Routines</Link>
      {userData.id ? (
        <>
          <Link onClick={logOut} to="/">
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link to={"/login"}>Login/Register</Link>
        </>
      )}
    </nav>
  );
};
export default Navbar;
