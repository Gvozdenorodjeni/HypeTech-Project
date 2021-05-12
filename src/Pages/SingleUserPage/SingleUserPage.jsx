import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { usersContext } from "../../App";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

const SingleUserPage = (props) => {
  const { users, setUsers } = useContext(usersContext);
  const history = useHistory();
  const [oneUserLoaded, setOneUserLoaded] = useState(false);
  const [oneUserLoading, setOneUserLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const paramsId = Number(props.match.params.id);
  const user = users.data.find((u) => {
    return paramsId === u.id;
  });

  const handleClose = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (!users.loaded && !users.loading && !oneUserLoaded && !oneUserLoading) {
      setOneUserLoading(true);

      fetch(`https://jsonplaceholder.typicode.com/users/${paramsId}`)
        .then((response) => {
          if (response.status !== 200) {
            setOneUserLoading(false);
            setOneUserLoaded(true);
            setShowError(true);
            return Promise.reject();
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setOneUserLoading(false);
          setOneUserLoaded(true);
          setUsers({
            data: [data],
            loading: users.loading,
            loaded: users.loaded,
          });
        });
    }
  }, []);

  const handleDelete = () => {
    setOneUserLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${paramsId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          setShowError(true);
          setOneUserLoading(false);
          return Promise.reject();
        } else {
          return response.json();
        }
      })
      .then(() => {
        const deletedUserIndex = users.data.findIndex((u) => u.id === paramsId);
        users.data.splice(deletedUserIndex, 1);
        setOneUserLoading(false);
        setUsers({
          data: users.data,
          loading: users.loading,
          loaded: users.loaded,
        });
        history.push("/users");
      });
  };

  return (
    <div>
      {(oneUserLoaded || users.loaded) &&
      !oneUserLoading &&
      !users.loading &&
      !user ? (
        <>
          <div>User does not exist</div>
          <Snackbar
            message="User not found."
            open={showError}
            autoHideDuration={10000}
            onClose={handleClose}
          />
        </>
      ) : (oneUserLoaded || users.loaded) &&
        !oneUserLoading &&
        !users.loading &&
        user ? (
        <>
          <h1>{user.name}</h1>
          <Button
            component={Link}
            to={{
              pathname: `/users/${user.id}/edit`,
            }}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
export default SingleUserPage;
