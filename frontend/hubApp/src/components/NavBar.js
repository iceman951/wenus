import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { Logout } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Chip, Menu, MenuItem, Paper } from "@material-ui/core";
import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function NavBar({ onClickMenu }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [NotiAnchorEl, setNotiAnchorEl] = useState(null);
  const openNoti = Boolean(NotiAnchorEl);
  const newPostNumber = useSelector((state) => state.post.newPostNumber);
  const isLoading = useSelector((state) => state.post.loading);
  const user = useSelector((state) => state.user.user);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNoti = (event) => {
    setNotiAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotiAnchorEl(null);
  };

  const handleLogOut = () => {
    Logout(dispatch);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => onClickMenu(true)}
            disabled={isLoading}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PSU HUB
          </Typography>

          <IconButton aria-label="show new notifications" color="inherit">
            <Badge badgeContent={newPostNumber} color="secondary">
              <NotificationsIcon onClick={handleNoti} />
            </Badge>
          </IconButton>
          <Menu
            id="noti-appbar"
            anchorEl={NotiAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openNoti}
            onClose={handleClose}
            style={{
              marginTop: 40,
              alignItems: "center",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Notification />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Notification />
            </MenuItem>
          </Menu>
          <Chip
            avatar={<Avatar />}
            label={user.firstName}
            onDelete={handleMenu}
            deleteIcon={<SettingsIcon style={{ color: "white" }} />}
            color="primary"
            style={{
              fontSize: 20,
              height: 50,
            }}
          />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
            style={{
              marginTop: 40,
            }}
          >
            <MenuItem onClick={(handleClose, handleLogOut)}>
              <MeetingRoomIcon fontSize="small" />
              <Typography variant="inherit">ออกจากระบบ</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
