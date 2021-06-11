import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  makeStyles,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  showNotifications,
  readNotification,
} from "../store/actions/notificationAction";
import { Logout } from "../store/actions/userAction";
import Logo from "./Logo";
import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.background.main,
  },
  menu: {
    marginTop: 40,
    marginBottom: 20,
    padding: 0,
    paddingRight: 17,
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
    paddingLeft: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  btnIcon: {
    marginRight: theme.spacing(1.5),
    background: theme.palette.background.main,
    color: theme.palette.background.default,
    width: 35,
    height: 35,
  },
  userChip: {
    color: "white",
    fontSize: 20,
    fontFamily: "KanitExtraBold",
    height: 45,
    borderColor: "white",
    borderRadius: 30,
    borderWidth: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
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

  const handleShowNotifications = (event) => {
    setNotiAnchorEl(event.currentTarget);
    showNotifications(dispatch);
  };
  const handleClickNotification = (notification) => {
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

  const handleOnClickLogo = () => {
    dispatch({ type: "RESET_POST" });
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
            onClick={() => onClickMenu()}
            disabled={isLoading}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <></>
        )}
        <Button
          disableRipple
          onClick={() => handleOnClickLogo()}
          style={{ backgroundColor: "transparent", flexGrow: 1 }}
        >
          <Logo />
        </Button>
        <Chip
          avatar={
            <Avatar
              className={classes.btnIcon}
              style={{
                width: 35,
                height: 35,
              }}
            />
          }
          label={user.firstName}
          className={classes.userChip}
          variant="outlined"
        />
        <IconButton
          aria-label="show new notifications"
          color="inherit"
          style={{ padding: 5 }}
          onClick={handleShowNotifications}
        >
          <Badge
            badgeContent={notifications?.filter((x) => !x.isNotify).length}
            color="secondary"
          >
            <NotificationsIcon/>
          </Badge>
        </IconButton>
        <Menu
          id="noti-appbar"
          anchorEl={NotiAnchorEl}
          open={openNoti}
          onClose={handleClose}
          PaperProps={{
            className: classes.menu,
            style: { width: 320 },
          }}
        >
          <Typography variant="h6" className={classes.menuTitle}>
            การแจ้งเตือน
          </Typography>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem
                key={notification._id}
                onClick={() => {
                  handleClickNotification(notification);
                  handleClose();
                }}
              >
                <Notification notification={notification} />
              </MenuItem>
            ))
          ) : (
            <Typography
              variant="body2"
              style={{ textAlign: "center", color: "gray" }}
            >
              ไม่มีการแจ้งเตือน
            </Typography>
          )}
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
