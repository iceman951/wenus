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
import {
  showNotifications,
  readNotification,
} from "../store/actions/notificationAction";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.background.main,
  },
  menu: {
    marginTop: 40,
    marginBottom: 20,
    padding: 0,
    alignItems: "center",
    overflowY: "scroll",
    msOverflowStyle: "none",
    overflow: "-moz-scrollbars-none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    backgroundColor: theme.palette.common.white,
  },
  menuTitle: {
    paddingLeft: 15,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  btnIcon: {
    marginRight: 15,
    backgroundColor: theme.palette.primary.main,
    width: 30,
    height: 30,
  },
}));
export default function NavBar({ onClickMenu }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [NotiAnchorEl, setNotiAnchorEl] = useState(null);
  const openNoti = Boolean(NotiAnchorEl);
  const isLoading = useSelector((state) => state.post.loading);
  const user = useSelector((state) => state.user.user);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShowNotiButton = (event) => {
    setNotiAnchorEl(event.currentTarget);
    showNotifications(dispatch);
  };
  const handleNoti = (notification) => {
    navigate(`/app/post/${notification.post}`);
    readNotification(dispatch, notification._id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotiAnchorEl(null);
  };

  const handleLogOut = () => {
    Logout(dispatch);
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {onClickMenu ? (
          <IconButton
            aria-label="menu"
            className={classes.menuButton}
            edge="start"
            color="inherit"
            onClick={() => onClickMenu(true)}
            disabled={isLoading}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <></>
        )}
        <Logo />
        <Chip
          avatar={
            <Avatar
              style={{
                width: 40,
                height: 40,
              }}
            />
          }
          label={user.firstName}
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "KanitExtraBold",
            height: 50,
            borderColor: "white",
            borderRadius: 50,
            borderWidth: 2,
            backgroundColor: "rgba(255,255,255,0.4)",
          }}
          variant="outlined"
        />
        <IconButton
          aria-label="show new notifications"
          color="inherit"
          style={{ padding: 5 }}
        >
          <Badge
            badgeContent={notifications?.filter((x) => !x.isNotify).length}
            color="secondary"
          >
            <NotificationsIcon onClick={handleShowNotiButton} />
          </Badge>
        </IconButton>
        <Menu
          id="noti-appbar"
          anchorEl={NotiAnchorEl}
          open={openNoti}
          onClose={handleClose}
          PaperProps={{
            className: classes.menu,
            style: { width: "25%" },
          }}
        >
          <Typography variant="h6" className={classes.menuTitle}>
            การแจ้งเตือน
          </Typography>
          {notifications.map((notification) => (
            <MenuItem
              key={notification._id}
              onClick={() => handleNoti(notification)}
              selected={notification.isRead}
            >
              <Notification notification={notification} />
            </MenuItem>
          ))}
        </Menu>
        <IconButton onClick={handleMenu} style={{ padding: 5 }}>
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
            <Avatar className={classes.btnIcon}>
              <MeetingRoomIcon fontSize="small" />
            </Avatar>
            <Typography variant="body1">ออกจากระบบ</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
