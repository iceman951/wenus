import React from "react";
import { useFormik } from "formik";
import axios from "axios";

import { Grid, Button } from "@material-ui/core";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

function LoginForm({ setJwt }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      axios
        .post(`https://guarded-falls-57008.herokuapp.com/users/login`, values)
        .then((res) => {
          console.log(res.data.access_token);
          setJwt(res.data.access_token);
          localStorage.setItem("token", res.data.access_token);
        });
    },
  });

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src='/assets/images/login.jpg'
            style={{ width: "100%", height: "100%" }}
            alt="brand"
          />
        </Grid>
        <Grid container item xs={12} sm={6} style={{ padding: 50 }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <img src='/assets/logos/logo.png' style={{ width: "100%" }} alt="logo" />
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{ padding: 25 }}
                >
                  <label htmlFor="loginEmail">Email Address</label>
                  <input
                    id="loginEmail"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </Grid>

                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    id="loginPassword"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </Grid>

                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{ padding: 25 }}
                >
                  <Button variant="contained" type="submit" color="primary">
                    Login
                  </Button>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginForm;
