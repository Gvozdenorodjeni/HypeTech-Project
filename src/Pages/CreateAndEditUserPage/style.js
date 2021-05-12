import { makeStyles } from "@material-ui/core/styles";

const useStylesButton = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export { useStylesButton, useStyles };
