import React, { MouseEventHandler } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import useStyles from "./style";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Brightness4Icon from "@material-ui/icons/Brightness4";

type SearchAppBarProps = {
  adminLoggedIn: boolean;
  toggleDarkTheme: MouseEventHandler;
  logout: MouseEventHandler;
};

export default function SearchAppBar(props: SearchAppBarProps) {
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

          <Button onClick={props.toggleDarkTheme} style={{ color: "default" }}>
            <Brightness4Icon color="action" />
          </Button>
          {props.adminLoggedIn && (
            <Button className={classes.button} onClick={props.logout}>
              Logout <ExitToAppIcon color="inherit" />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
