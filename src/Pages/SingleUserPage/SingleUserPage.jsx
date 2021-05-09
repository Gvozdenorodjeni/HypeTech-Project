import { CircularProgress, Snackbar } from "@material-ui/core";
import { Fragment, useContext, useEffect, useState } from "react";
import { usersContext } from "../../App";

const SingleUserPage = (props) => {
  const { users, setUsers } = useContext(usersContext);
  const [oneUserLoaded, setOneUserLoaded] = useState(false);
  const [oneUserLoading, setOneUserLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const paramsId = Number(props.match.params.id);

  const handleClose = () => {
    setShowError(false);
  };

  useEffect(() => {
    // TODO: Remove timeout when dev is finished
    setTimeout(() => {
      if (
        !users.loaded &&
        !users.loading &&
        !oneUserLoaded &&
        !oneUserLoading
      ) {
        setOneUserLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${paramsId}`)
          .then((response) => {
            if (response.status !== 200) {
              setShowError(true);
              setOneUserLoading(false);
              setOneUserLoaded(true);
              return Promise.reject();
            } else {
              return response.json();
            }
          })
          .then((data) => {
            const newSetOfUsers = users.data.concat([data]);
            setUsers({
              data: newSetOfUsers,
              loading: false,
              loaded: false,
            });
          });
      }
    }, 1000);
  }, []);

  const user = users.data.find((u) => {
    return paramsId === u.id;
  });

  return (
    <div>
      {(oneUserLoaded || users.loaded) && !user ? (
        <Fragment>
          <div>Problem</div>
          <Snackbar
            message="User not found."
            open={showError}
            autoHideDuration={10000}
            onClose={handleClose}
          />
        </Fragment>
      ) : user ? (
        <h1>{user.name}</h1>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
export default SingleUserPage;
