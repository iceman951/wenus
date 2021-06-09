import { Outlet } from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core/";
import Navbar from "../../components/NavBar";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
  },
  container: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    minHeight: window.innerHeight - 64,
    overflow: "auto",
  },
}));

const MainLayout = () => {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Navbar />
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          <Box className={classes.content}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
