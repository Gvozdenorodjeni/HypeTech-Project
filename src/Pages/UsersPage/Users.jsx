import { useContext, useEffect, useState } from "react";
import { usersContext, themeContext } from "../../App";
import User from "../../components/User/User";
import TableBody from "@material-ui/core/TableBody";
import {
  CircularProgress,
  TableContainer,
  Snackbar,
  TablePagination,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useStyles from "./style";

const Users = () => {
  const { users, setUsers } = useContext(usersContext);
  const { theme } = useContext(themeContext);
  const [showError, setShowError] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    if (!users.loaded && !users.loading) {
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
  }, [users.loaded, users.loading, setUsers]);

  const handleClose = () => {
    setShowError(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  console.log(users);
  return (
    <div className={classes.divStyle}>
      <TableContainer className={classes.root}>
        <Table>
          <TableHead
            className={
              theme.palette.type === "light"
                ? classes.infoLight
                : classes.infoDark
            }
          >
            <TableRow>
              <TableCell className={classes.fontColor}>Name</TableCell>
              <TableCell className={classes.fontColor} align="right">
                Id
              </TableCell>
              <TableCell className={classes.fontColor} align="right">
                Email
              </TableCell>
              <TableCell className={classes.fontColor} align="right">
                City
              </TableCell>
              <TableCell className={classes.fontColor} align="right">
                Company
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!users.loading &&
              users.loaded &&
              users.data
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((user) => (
                  <User theme={theme} key={user.id} user={user} />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {users.data.length && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={users.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}

      {(users.loading || !users.loaded) && <CircularProgress />}
      <Snackbar
        message="There was an error with loading users' information. Please reload the page."
        open={showError}
        autoHideDuration={10000}
        onClose={handleClose}
      />
    </div>
  );
};
export default Users;
