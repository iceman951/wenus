import React from "react";
import { useFormik } from "formik";

import { Axios } from "../components/HttpClient"

import {
  Grid,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  Divider,
} from "@material-ui/core";

import RegisterForm from "./RegisterForm";

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
      Axios
      .post(`/users/login`, values)
      .then((res) => {
        setJwt(res.data.access_token);
        localStorage.setItem("token", res.data.access_token);
      })
      .catch((err) => {
        console.log(err.response);
      })
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
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container 
                  justify="center"
                  style={{ padding: 25 }}
                >
                  <FormControl fullWidth variant="outlined" style={{ marginBottom: 20 }}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <OutlinedInput
                      id="email"
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
                  <FormControl fullWidth variant="outlined" style={{ marginBottom: 20 }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      label="Password"
                      type="password"
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  {formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                  <Grid item xs={7}>
                  <Button size="large" fullWidth variant="contained" type="submit" color="primary">
                    Login
                  </Button>
                  </Grid>
                </Grid>
              </form>
            <h1>Register</h1>
            <Divider style={{ marginBottom: "3%" }} />
            <RegisterForm />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginForm;
