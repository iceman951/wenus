import React from "react";
import { useFormik } from "formik";
import axios from "axios";

import {
  Grid,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  Divider,
} from "@material-ui/core";

import RegisterForm from ".//RegisterForm";

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
            src="/assets/images/login.jpg"
            style={{ width: "100%", height: "100%" }}
            alt="brand"
          />
        </Grid>
        <Grid container item xs={12} sm={6} style={{ padding: 50 }}>
          <div>
            <Grid container justify="center">
              <img
                src="/assets/logos/logo.png"
                style={{ width: "50%" }}
                alt="logo"
              />
            </Grid>
            <h1>Login</h1>
            <Divider />
            <Grid container justify="center">
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  style={{ padding: 25 }}
                >
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="loginEmail">Email Address</InputLabel>
                    <OutlinedInput
                      id="loginEmail"
                      label="Email Address"
                      type="email"
                      autoFocus={true}
                      onChange={formik.handleChange}
                      defaultValue={formik.values.email}
                    />
                  </FormControl>
                  {formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </Grid>
                <Grid container direction="column" alignItems="center">
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                    <OutlinedInput
                      id="loginPassword"
                      label="Password"
                      type="password"
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  {formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </Grid>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  style={{ padding: 25 }}
                >
                  <Button variant="contained" type="submit" color="primary">
                    Login
                  </Button>
                </Grid>
              </form>
            </Grid>
            <h1>Register</h1>
            <Divider />
            <Grid container justify="center">
              <RegisterForm />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginForm;
