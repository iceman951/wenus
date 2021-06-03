import React from "react";
import { Avatar, Box, Container, Grid, Typography } from "@material-ui/core";

const Notification = ({ notification }) => {
  return (
    <>
      <Box component="div" whiteSpace="normal">
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          spacing={2}
          wrap="nowrap"
        >
          <Grid item style={{ paddingTop: 15 }}>
            <Avatar />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant="body2" display="inline">
              NAME SURNAME{" "}
            </Typography>
            {notification?.type === "comment" ? (
              <Typography
                variant="caption"
                style={{ overflowWrap: "break-word" }}
              >
                ได้แสดงความคิดเห็นในโพสต์ของคุณ
              </Typography>
            ) : (
              <Typography
                variant="caption"
                style={{ overflowWrap: "break-word" }}
              >
                ได้กดถูกใจโพสต์ของคุณ
              </Typography>
            )}
            <Typography
              variant="caption"
              display="block"
              style={{ color: "blue" }}
            >
              ประมาณ 1 ชั่วโมงที่แล้ว
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Notification;
