import React from "react";
import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MessageIcon from "@material-ui/icons/Message";
import TimelineDot from "@material-ui/lab/TimelineDot";
import moment from "moment";
import "moment/locale/th";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  avtIcon: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
}));

const Notification = ({ notification }) => {
  const classes = useStyle();
  return (
    <Box component="div" whiteSpace="normal" className={classes.root}>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={2}
        wrap="nowrap"
      >
        <Grid item>
          {notification?.type === "comment" ? (
            <Avatar className={classes.avtIcon} style={{backgroundColor: notification.isRead && "gray"}}>
              <MessageIcon fontSize="small" />
            </Avatar>
          ) : (
            <Avatar className={classes.avtIcon}>
              <ThumbUpIcon fontSize="small" />
            </Avatar>
          )}
        </Grid>
        <Grid item xs zeroMinWidth>
          {notification?.type === "comment" ? (
            <Typography variant="body2" style={{ overflowWrap: "break-word" }}>
              มีความคิดเห็นใหม่ในโพสต์ของคุณ
            </Typography>
          ) : (
            <Typography variant="body2" style={{ overflowWrap: "break-word" }}>
              มี {notification?.likeAmount} คนถูกใจโพสต์ของคุณ
            </Typography>
          )}
          <Typography variant="caption" display="block">
            {moment(notification?.createDate).fromNow()}
          </Typography>
        </Grid>
        <Grid item>
          {!notification.isRead && <TimelineDot color="primary" />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Notification;
