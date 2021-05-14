import React from "react";
import { Link } from "react-router-dom";

import {
  Grid,
  Divider,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";

import LoginForm from "../../forms/LoginForm";
export default function LoginPage({ setJwt }) {
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid item xs={12} lg={6}>
        <img
          src="/assets/images/login.jpg"
          style={{ width: "100%", height: "100%" }}
          alt="brand"
        />
      </Grid>
      <Grid container item xs={12} lg={6} style={{ padding: "1%" }}>
        <Grid container justify="center">
          <div>
            <Grid container justify="center" style={{ padding: 50 }}>
              <img
                src="/assets/logos/logo.png"
                style={{ width: "75%" }}
                alt="logo"
              />
            </Grid>
            <Grid container justify="center" style={{ marginBottom: "3%" }}>
              <Grid item xs={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h4">LOGIN</Typography>
                    <Divider />
                    <Grid container justify="center" style={{ padding: 25 }}>
                      <LoginForm setJwt={setJwt} />
                      <Typography variant="h5" style={{ padding: 20 }}>
                        OR
                      </Typography>
                      <Button
                        size="large"
                        fullWidth
                        variant="contained"
                        type="submit"
                        color="primary"
                        component={Link}
                        to="/register"
                      >
                        Sign UP
                      </Button>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}