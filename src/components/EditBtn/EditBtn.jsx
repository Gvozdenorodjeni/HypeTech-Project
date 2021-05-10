import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./style";

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        Edit
      </Button>
    </div>
  );
}
