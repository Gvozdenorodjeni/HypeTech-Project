import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { usersContext } from "../../App";

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
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  //
}));

export default function SearchAppBar(props) {
  console.log(props.loaded, "AAAA");
  const { users } = useContext(usersContext);
  console.log(users);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Users - App
          </Typography>
          {props.loaded ? (
            <Button
              className={classes.button}
              component={Link}
              to={"/users/create"}
            >
              Create
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
