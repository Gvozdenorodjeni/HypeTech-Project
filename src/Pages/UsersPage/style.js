import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    marginTop: "30px",
  },
  infoLight: {
    backgroundColor: "#3D84B8",
    color: "white",
  },
  fontColor: {
    fontWeight: "500",
    color: "white",
  },
  infoDark: {
    backgroundColor: "#3D84B8",
    color: "white",
  },
}));
export default useStyles;
