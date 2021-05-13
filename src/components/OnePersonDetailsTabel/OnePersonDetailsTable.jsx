import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import HttpIcon from "@material-ui/icons/Http";
import BusinessIcon from "@material-ui/icons/Business";
import useStyles from "./style";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
const OnePersonDetailsTable = (props) => {
  const classes = useStyles();
  const user = props.user;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>
              <p>Id</p> <FingerprintIcon color="primary" />
            </TableCell>
            <TableCell className={classes.tableCell}>
              <p>Name</p> <PersonIcon color="primary" />
            </TableCell>
            <TableCell className={classes.tableCell}>
              <p>Email</p> <EmailIcon color="primary" />{" "}
            </TableCell>
            <TableCell className={classes.tableCell}>
              <p>Address</p> <HomeIcon color="primary" />
            </TableCell>
            <TableCell className={classes.tableCell}>
              <p>Phone</p> <PhoneAndroidIcon color="primary" />
            </TableCell>
            <TableCell className={classes.tableCell}>
              <p>Website</p> <HttpIcon color="primary" />
            </TableCell>
            <TableCell className={classes.tableCell}>
              <p>Company</p> <BusinessIcon color="primary" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell}>{user?.id}</TableCell>
            <TableCell
              className={classes.tableCell}
            >{`${user?.name} ${user?.username}`}</TableCell>
            <TableCell className={classes.tableCell}>{user?.email}</TableCell>
            <TableCell className={classes.tableCell}>
              {user?.address?.street}
            </TableCell>
            <TableCell className={classes.tableCell}>{user?.phone}</TableCell>
            <TableCell className={classes.tableCell}>{user?.website}</TableCell>
            <TableCell className={classes.tableCell}>
              {user?.company?.name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default OnePersonDetailsTable;
