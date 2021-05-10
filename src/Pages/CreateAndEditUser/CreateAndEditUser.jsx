import { Button, Snackbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import React from "react";
import { useStylesButton, useStyles } from "./style";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const CreateAndEditUser = (props) => {
  const args =
    props.match.params.id === undefined
      ? {
          defaultDisabledForm: false,
          defaultUserName: "",
          defaultUserEmail: "",
          url: "https://jsonplaceholder.typicode.com/users",
          method: "POST",
        }
      : {
          defaultDisabledForm: true,
          defaultUserName: "ASD",
          defaultUserEmail: "ASD@ASD.aA",
          url: `https://jsonplaceholder.typicode.com/users/${props.match.params.id}`,
          method: "PUT",
        };

  const history = useHistory();

  const [validForm, setValidForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [disabled, setDisabled] = useState(!args.defaultDisabledForm);
  const [newUserName, setNewUserName] = useState(args.defaultUserName);
  const [newUserEmail, setNewUserEmail] = useState(args.defaultUserEmail);
  const classes = useStyles();
  const classesButton = useStylesButton();
  const validatorListener = (result) => {
    setDisabled(!result);
  };
  const handleClose = () => {
    setShowError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = newUserName && newUserEmail;
    setValidForm(isValid);
  };
  const handleChangeName = (event) => {
    setNewUserName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setNewUserEmail(event.target.value);
  };

  useEffect(() => {
    if (validForm) {
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
            setShowError(true);
            return Promise.reject();
          } else {
            return response.json();
          }
        })
        .then((data) => history.push("/users"));
    }
  }, [validForm, newUserName, newUserEmail]);

  return (
    <>
      <ValidatorForm
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextValidator
          value={newUserName}
          onChange={handleChangeName}
          validatorListener={validatorListener}
          id="name"
          label="Name"
          variant="outlined"
          validators={["required"]}
          errorMessages={["This field is required"]}
        />
        <TextValidator
          onChange={handleChangeEmail}
          validatorListener={validatorListener}
          value={newUserEmail}
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
    </>
  );
};
export default CreateAndEditUser;
