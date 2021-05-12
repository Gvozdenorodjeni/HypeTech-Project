import { useHistory } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const User = ({ user }) => {
  const history = useHistory();

  const handleRowClick = (id) => {
    history.push(`/users/${id}`);
  };

  return (
    <TableRow key={user.id} onClick={() => handleRowClick(user.id)}>
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
