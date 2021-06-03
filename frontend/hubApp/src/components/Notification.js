import React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";

const Notification = () => {
  return (
    <>
      <Grid container direction='row' alignItems='center'>
        <Grid item >
            <Avatar />
        </Grid>
        <Grid item xs={10} style={{ paddingLeft: 10}}>
            <Typography variant='body2' display='inline'>NAME SURNAME </Typography>
            <Typography variant='caption'>ได้แสดงความคิดเห็นในโพสต์ของคุณ</Typography>
            <Typography variant='caption' display='block'>ประมาณ 1 ชั่วโมงที่แล้ว</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Notification;
