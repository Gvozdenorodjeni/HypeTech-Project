import { useContext } from "react";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import useStyles from "./style";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Brightness4Icon from "@material-ui/icons/Brightness4";

export default function SearchAppBar(props) {
  console.log(props);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.adminLoggedIn && (
            <IconButton component={Link} to="/users">
              <HomeIcon />
            </IconButton>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            Users - App
          </Typography>
          {props.adminLoggedIn && (
            <Button
              className={classes.button}
              component={Link}
              to={"/users/create"}
            >
              Create User
            </Button>
          )}

          <Button onClick={props.toggleDarkTheme} style={{ color: "white" }}>
            <Brightness4Icon color="white" />
          </Button>
          {props.adminLoggedIn && (
            <Button className={classes.button} onClick={props.logout}>
              Logout <ExitToAppIcon color="white" />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
