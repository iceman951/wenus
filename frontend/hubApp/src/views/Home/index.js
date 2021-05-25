import React from "react";
import NavBar from "../../components/NavBar";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import TagsBar from "./TagsBar";
import { useSelector } from "react-redux";
import Login from "../LoginPage/index";
import { Drawer, Grid, makeStyles, Toolbar } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const classes = useStyles();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {
    return <Login />;
  }
  return (
    <div
      style={{
        backgroundImage: `url(/assets/images/bg1.jpg)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: window.innerHeight,
      }}
    >
      <NavBar />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item container direction="column" xs={10}>
          <Grid item>
            <CreatePost />
            <Posts />
          </Grid>
        </Grid>
        <Grid item xs={2} position="fixed">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="right"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <TagsBar />
          </Drawer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
