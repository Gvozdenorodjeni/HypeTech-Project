import { useHistory } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import useStyles from "./style";

type UserProps = {
  user: {
    email: string;
    id: number;
    name: string;
    address?: {
      city?: string;
      geo?: {
        lat?: string;
        lng?: string;
      };
      street?: string;
      suite?: string;
      zipcode?: string;
    };
    company?: {
      bs?: string;
      catchPhrase?: string;
      name?: string;
    };
    phone?: string;
    username?: string;
    website?: string;
  };
  theme: any;
};

const User = (props: UserProps) => {
  const history = useHistory();
  const user = props.user;
  const theme = props.theme;

  const handleRowClick = (id: number) => {
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
