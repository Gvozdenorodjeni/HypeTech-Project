import { useHistory } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import useStyles from "./style";

const User = (props) => {
  const history = useHistory();
  const user = props.user;
  const theme = props.theme;

  const handleRowClick = (id) => {
    history.push(`/users/${id}`);
  };
  const classes = useStyles();
  return (
    <TableRow
      className={
        theme.palette.type === "light" ? classes.rootLight : classes.rootDark
      }
      key={user.id}
      onClick={() => handleRowClick(user.id)}
    >
      <TableCell component="th" scope="row">
        {user.name}
      </TableCell>
      <TableCell align="right">{user?.id}</TableCell>
      <TableCell align="right">{user?.email}</TableCell>
      <TableCell align="right">{user?.address?.street}</TableCell>
      <TableCell align="right">{user?.company?.name}</TableCell>
    </TableRow>
  );
};

export default User;
