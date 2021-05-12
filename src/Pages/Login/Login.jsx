import "./style.js";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./style";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Snackbar } from "@material-ui/core";
import { adminContext } from "../../App";
import { useContext } from "react";

export default function SignIn({ history }) {
  const { admin, setAdmin } = useContext(adminContext);
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const classes = useStyles();

  const validatorListener = (isValid) => {
    setDisabled(!isValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!admin.registered) {
      localStorage.setItem("email", email);
      setAdmin({
        registered: email,
        current: email,
      });
    } else if (admin.registered !== email) {
      setShowError(true);
      return;
    }
    setAdmin({
      registered: admin.registered,
      current: email,
    });
    history.push("/users");
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <ValidatorForm
          className={classes.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextValidator
            onChange={handleChange}
            value={email}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            validators={["required", "isEmail"]}
            errorMessages={["This field is required", "Email is not valid."]}
            validatorListener={validatorListener}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            {admin.registered ? "Log In" : "Sign In"}
          </Button>
        </ValidatorForm>
      </div>
      <Snackbar
        message="Email does not match."
        open={showError}
        autoHideDuration={10000}
        onClose={handleClose}
      />
    </Container>
  );
}
