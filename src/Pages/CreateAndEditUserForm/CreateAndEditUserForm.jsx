import { Button, Snackbar } from "@material-ui/core";
import { useState } from "react";
import React from "react";
import { useStylesButton, useStyles } from "./style";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const CreateAndEditUserForm = (props) => {
  const args = props.args;
  const users = props.users;
  const setUsers = props.setUsers;
  const setOneUserLoading = props.setOneUserLoading;
  const hide = props.hide;

  const history = useHistory();

  const [showError, setShowError] = useState(false);
  const [userNameErrored, setUserNameErrored] = useState(
    !args.defaultDisabledForm
  );
  const [userEmailErrored, setUserEmailErrored] = useState(
    !args.defaultDisabledForm
  );
  const [disabled, setDisabled] = useState(!args.defaultDisabledForm);
  const [newUserName, setNewUserName] = useState(args.defaultUserName);
  const [newUserEmail, setNewUserEmail] = useState(args.defaultUserEmail);

  const classes = useStyles();
  const classesButton = useStylesButton();

  const userNameValidatorListener = (result) => {
    setDisabled(!result || userEmailErrored);
    setUserNameErrored(!result);
  };
  const userEmailValidatorListener = (result) => {
    setDisabled(!result || userNameErrored);
    setUserEmailErrored(!result);
  };

  const handleClose = () => {
    setShowError(false);
  };

  const handleChangeName = (event) => {
    setNewUserName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setNewUserEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = newUserName && newUserEmail;

    if (isValid) {
      setOneUserLoading(true);

      fetch(args.url, {
        method: args.method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newUserName, email: newUserEmail }),
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            setOneUserLoading(false);
            setShowError(true);
            return Promise.reject();
          } else {
            return response.json();
          }
        })
        .then((data) => {
          const newSetOfUsers = args.getNewSetOfUsers(users.data, data);
          setOneUserLoading(false);
          setUsers({
            data: newSetOfUsers,
            loading: users.loading,
            loaded: users.loaded,
          });
          history.push("/users");
        });
    }
  };

  return (
    <ValidatorForm
      onSubmit={handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{ display: hide ? "none" : undefined }}
    >
      <TextValidator
        value={newUserName || ""}
        onChange={handleChangeName}
        validatorListener={userNameValidatorListener}
        id="name"
        label={"Name"}
        variant="outlined"
        validators={["required"]}
        errorMessages={["This field is required"]}
      />
      <TextValidator
        onChange={handleChangeEmail}
        validatorListener={userEmailValidatorListener}
        value={newUserEmail || ""}
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label={"Email Address"}
        name="email"
        autoComplete="email"
        autoFocus
        validators={["required", "isEmail"]}
        errorMessages={["This field is required", "Email is not valid."]}
        variant="outlined"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classesButton.button}
        startIcon={<SaveIcon />}
        disabled={disabled}
      >
        Save
      </Button>
      <Snackbar
        message="There was an error saving user data information. Please try again"
        open={showError}
        autoHideDuration={10000}
        onClose={handleClose}
      />
    </ValidatorForm>
  );
};
export default CreateAndEditUserForm;
