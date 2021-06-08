import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    textAlign: "left",
  },
}));

const Logo = () => {
  const classes = useStyle();
  return (
    <Typography variant="h4" className={classes.logo}>
      <RouterLink
        to="/"
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
      >
        PSU HUB
      </RouterLink>
    </Typography>
  );
};

export default Logo;
