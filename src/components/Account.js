import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";
import Button from "@material-ui/core/Button";


const Account = ({ action, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = action === "login";
  const title = isLogin ? "Login" : "Create Account";
  const oppositeTitle = isLogin ? "Create Account" : "Login";
  const oppositeAction = isLogin ? "register" : "login";
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `users/${action}`,
      body: { username, password },
      method: "POST",
    });
    const token = data?.token;

    if (token) {
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      setToken(token);
      history.push("/dashboard");
    }
    // if (!token) {
    //   localStorage.clear();
    //   history.push("/");
    //   // history.push(`/${action}`);
     
    // }
  };

  return (
    <div className="account-form">
      <h1> {title} </h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Username:</label>
        <input
          type="text"
          required
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <label>Re-enter Password:</label>
        <input
          type="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <Button type="submit" variant="outlined" color="primary" type="submit"> {title} </Button>
      </form>

      <div>
        {!isLogin ? (
          <>
            <div>
              Please create a password greater than 8 characters
              <div>
                <br></br>
              </div>
            </div>
            <div>
              If you have and account already log in
              <Link to={`/${oppositeAction}`}> here!</Link>
            </div>
          </>
        ) : (
          <div>
            Don't have and account yet? Sign up
            <Link to={`/${oppositeAction}`}> here!</Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Account;
