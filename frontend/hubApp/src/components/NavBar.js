import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { Logout } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  Chip,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  menu: {
    marginTop: 50,
    width: 300,
    alignItems: "center",
  },
  menuTitle: {
    paddingLeft: 15,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  btnIcon: {
    marginRight: 20,
    backgroundColor: theme.palette.primary.main,    
  }
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
          <Chip
            avatar={
              <Avatar
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            }
            label={user.firstName}
            color="primary"
            style={{
              fontSize: 20,
              height: 50,
            }}
          />
          <IconButton aria-label="show new notifications" color="inherit" style={{padding: 5}}>
            <Badge badgeContent={newPostNumber} color="secondary">
              <NotificationsIcon onClick={handleNoti} />
            </Badge>
          </IconButton>
          <Menu
            id="noti-appbar"
            anchorEl={NotiAnchorEl}
            open={openNoti}
            onClose={handleClose}
            PaperProps={{
              className: classes.menu,
            }}
          >
            <Typography variant="h6" className={classes.menuTitle}>
              การแจ้งเตือน
            </Typography>
            <Typography variant="subtitle2" className={classes.menuTitle}>
              ใหม่
            </Typography>
            {/* .filter Read is false and .map call MenuItem */}
            <MenuItem onClick={handleClose}>
              <Notification />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Notification />
            </MenuItem>
            <Typography variant="subtitle2" className={classes.menuTitle}>
              ก่อนหน้านี้
            </Typography>
            {/* .filter Read is false and .map call MenuItem */}
            <MenuItem onClick={handleClose}>
              <Notification />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Notification />
            </MenuItem>
          </Menu>
          <IconButton onClick={handleMenu} style={{padding: 5}}>
            <SettingsIcon style={{ color: "white" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              className: classes.menu,
            }}
          >
            <Typography variant="h6" className={classes.menuTitle}>
              บัญชีของคุณ
            </Typography>
            <MenuItem onClick={(handleClose, handleLogOut)}>
              <Avatar className={classes.btnIcon} >
                <MeetingRoomIcon />
              </Avatar>
              <Typography variant="inherit">
                ออกจากระบบ
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
