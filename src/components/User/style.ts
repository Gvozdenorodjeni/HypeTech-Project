import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  rootLight: {
    flexGrow: 1,
    cursor: "pointer",
    "&:nth-child(2n)": {
      backgroundColor: "white",
    },
    "&:hover": {
      backgroundColor: "#ebf7ff",
    },
  },
  rootDark: {
    flexGrow: 1,
    cursor: "pointer",
    "&:nth-child(2n)": {
      backgroundColor: "#202020",
    },
    "&:hover": {
      backgroundColor: "#101010",
    },
  },
}));
export default useStyles;
