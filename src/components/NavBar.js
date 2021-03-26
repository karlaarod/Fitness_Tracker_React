import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ userData, setUserData, setToken }) => {
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    setUserData({});
    setToken("");
    history.push("/");
  };
  return (
    <nav className="navbar">
    {/* <div>{userData._id ? */}
     <Link to={"/dashboard"}>Dashboard</Link>
    {/* //   : ""}</div> */}
    <div>
      <Link to={"/myactivities"}> My Activities </Link>
    </div>
    {/* <div>
      {userData._id ? (
        <Link to={"/create"}>Create</Link>
      ) : (
        <Link to={"/create-error"}></Link>
      )}
    </div> */}
    <div>
      {/* {userData._id ? ( */}
        <Link onClick={logOut} to="/">
          Log Out
        </Link>
      {/* ) : ( */}
        {/* <Link to={"/login"}>Login/Register</Link>
      )} */}
    </div>
    <div>
        <Link to={"/login"}>Login/Register</Link>
    </div>
    <div>
      <Link to={"/update"}>Edit Activities</Link>
    </div>
    </nav>
  );
};
export default Navbar;