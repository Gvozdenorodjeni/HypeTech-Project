import { CircularProgress, Snackbar } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { usersContext } from "../../App";
import React from "react";
import CreateAndEditUserForm from "../CreateAndEditUserForm/CreateAndEditUserForm";

const CreateAndEditUserPage = (props) => {
  const { users, setUsers } = useContext(usersContext);

  const [showError, setShowError] = useState(false);
  const [oneUserLoaded, setOneUserLoaded] = useState(false);
  const [oneUserLoading, setOneUserLoading] = useState(false);

  const user = users.data.find(
    (e) => e.id.toString() === props.match.params.id
  );

  const args =
    props.match.params.id === undefined
      ? {
          createPage: true,
          defaultDisabledForm: false,
          defaultUserName: "",
          defaultUserEmail: "",
          url: "https://jsonplaceholder.typicode.com/users",
          method: "POST",
          getNewSetOfUsers: (usersData, data) => {
            return usersData.concat([data]);
          },
        }
      : !user
      ? {
          createPage: false,
        }
      : {
          createPage: false,
          defaultDisabledForm: true,
          defaultUserName: user.name,
          defaultUserEmail: user.email,
          url: `https://jsonplaceholder.typicode.com/usersx/${props.match.params.id}`,
          method: "PUT",
          getNewSetOfUsers: (usersData, data) => {
            const userIndex = usersData.findIndex((u) => u.id === data.id);
            const newSetOfUsers = [...usersData];
            newSetOfUsers[userIndex] = data;
            return newSetOfUsers;
          },
        };
  const loading = oneUserLoading || users.loading;
  const errored =
    !user &&
    !args.createPage &&
    ((oneUserLoaded && !oneUserLoading) || (users.loaded && !users.loading));

  const handleClose = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (
      !args.createPage &&
      !users.loaded &&
      !users.loading &&
      !oneUserLoaded &&
      !oneUserLoading
    ) {
      setOneUserLoading(true);

      fetch(
        `https://jsonplaceholder.typicode.com/users/${props.match.params.id}`
      )
        .then((response) => {
          if (response.status !== 200) {
            setOneUserLoaded(true);
            setOneUserLoading(false);
            setShowError(true);
            return Promise.reject();
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setUsers({
            data: [data],
            loading: users.loading,
            loaded: users.loaded,
          });
          setOneUserLoaded(true);
          setOneUserLoading(false);
        });
    }
  }, []);

  let information;
  if (errored) {
    information = (
      <>
        <>User does not exist</>
        <Snackbar
          message="User not found."
          open={showError}
          autoHideDuration={10000}
          onClose={handleClose}
        />
      </>
    );
  } else if (loading) {
    information = <CircularProgress />;
  }

  return (
    <>
      {information}
      {(users.loaded || oneUserLoaded || args.createPage) && (
        <CreateAndEditUserForm
          args={args}
          users={users}
          setUsers={setUsers}
          hide={oneUserLoading || users.loading}
          setOneUserLoading={setOneUserLoading}
        />
      )}
    </>
  );
};
export default CreateAndEditUserPage;
