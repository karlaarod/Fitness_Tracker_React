import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from '@material-ui/icons/AccountCircle';
import GrainOutlinedIcon from '@material-ui/icons/GrainOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    }
}));

const Navbar = ({ userData, setUserData, setToken }) => {
  console.log("user logged in ID:", userData.id);
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);

  const logOut = () => {
    localStorage.clear();
    setUserData({});
    setToken("");
    history.push("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuChange = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  return (
    <nav >
      <AppBar
      position="fixed" 
      style={{ background: 'rgb(27, 45, 124)' }}
      >
     <Toolbar>
    <GrainOutlinedIcon/>
     <Typography 
          variant="h6" 
          className={classes.title} 
          onClick={() => handleMenuChange("/")}
          style={{ cursor: 'pointer' }}
          >
            Fitness Tracker
          </Typography>
          <MenuItem 
          onClick={() => handleMenuChange("/activities")}> Activities </MenuItem>
      <MenuItem 
      onClick={() => handleMenuChange("/routines")}
      >
        Routines</MenuItem>
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
          <AccountCircle 
          />
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openAnchor}
              onClose={() => setAnchorEl(null)}
            >
          {userData.id ? (
        <>
          <MenuItem onClick={() => handleMenuChange("/my-routines")}> My Routines </MenuItem>
          <MenuItem onClick={() => handleMenuChange("/dashboard")}> Dashboard </MenuItem>
        </>
      ) : (
        ""
      )}
      {userData.id ? (
      <MenuItem onClick={() => logOut()}>
      Log Out
      </MenuItem>
      ) : (
        <MenuItem onClick={() => handleMenuChange("/login")}> Login </MenuItem>
      )}
      </Menu>
    </Toolbar>
      </AppBar>
    </nav>
  );
};
export default Navbar;
