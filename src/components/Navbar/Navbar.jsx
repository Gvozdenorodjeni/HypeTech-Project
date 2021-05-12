import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  button: {
    backgroundColor: "#ffbb33",
    color: "white",
  },

  title: {
    flexGrow: 1,
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  //
}));

export default function SearchAppBar(props) {
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
              Create
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
