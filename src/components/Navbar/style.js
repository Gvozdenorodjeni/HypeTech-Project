import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  button: {
    backgroundColor: "#3d84b8",
    color: "white",
  },

  title: {
    flexGrow: 1,
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));
export default useStyles;
