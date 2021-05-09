import { useContext, useEffect, useState } from "react";
import { usersContext } from "../../App";
import User from "../../components/User/User";
import TableBody from "@material-ui/core/TableBody";
import { CircularProgress, TableContainer, Snackbar } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const Users = () => {
  const { users, setUsers } = useContext(usersContext);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // TODO: Remove timeout when dev is finished
    setTimeout(() => {
      if (!users.loaded && !users.loading) {
        setUsers({
          data: [],
          loaded: false,
          loading: true,
        });
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => {
            if (response.status !== 200) {
              setShowError(true);
              setUsers({
                data: [],
                loaded: true,
                loading: false,
              });
              return Promise.reject();
            } else {
              return response.json();
            }
          })
          .then((data) => {
            setUsers({
              data,
              loaded: true,
              loading: false,
            });
          });
      }
    }, 1000);
  }, [users.loaded, users.loading, setUsers]);

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {users.loading || !users.loaded ? <CircularProgress /> : null}
      {showError && (
        <Snackbar
          message="There was an error with loading users' information. Please reload the page."
          open={showError}
          autoHideDuration={10000}
          onClose={handleClose}
        />
      )}
    </div>
  );
};
export default Users;
