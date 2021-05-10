import "./style.js";
import React, { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./style";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Snackbar } from "@material-ui/core";

export default function SignIn({ history }) {
  const [localStorageEmail] = useState(localStorage.getItem("email"));
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const textValidatorComponent = useRef();

  const classes = useStyles();

  const validatorListener = (result) => {
    setDisabled(!result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!localStorageEmail) {
      localStorage.setItem("email", email);
    } else if (localStorageEmail !== email) {
      setShowError(true);
      return;
    }
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
            ref={textValidatorComponent}
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
            {localStorageEmail ? "Log In" : "Sign In"}
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
