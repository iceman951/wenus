import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Axios } from "../components/HttpClient";

import {
  Grid,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Divider,
} from "@material-ui/core";

import RegisterForm from "./RegisterForm";

function LoginForm({ setJwt }) {
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(5, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      Axios.post(`/users/login`, values)
        .then((res) => {
          setJwt(res.data.access_token);
          localStorage.setItem("token", res.data.access_token);
        })
        .catch((err) => {
          if (err.response.status === 404){
            actions.setFieldError('email', 'บัญชีนี้ไม่ได้รับการลงเทียน')
          }
          else if (err.response.status === 401) {
            actions.setFieldError('password', 'รหัสผ่านไม่ถูกต้อง')
          }
          
          // console.error(err.response);
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
            <form onSubmit={LoginForm.handleSubmit}>
              <Grid container justify="center" style={{ padding: 25 }}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <OutlinedInput
                    id="login-email"
                    name="email"
                    label="Email Address"
                    type="email"
                    autoFocus={true}
                    onChange={LoginForm.handleChange}
                    defaultValue={LoginForm.values.email}
                  />
                  <FormHelperText
                    error={
                      LoginForm.touched.email && Boolean(LoginForm.errors.email)
                    }
                    id="login-email"
                  >
                    {LoginForm.touched.email && LoginForm.errors.email}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="login-password"
                    name="password"
                    label="Password"
                    type="password"
                    onChange={LoginForm.handleChange}
                  />
                  <FormHelperText
                    error={
                      LoginForm.touched.password && Boolean(LoginForm.errors.password)
                    }
                    id="login-password"
                  >
                    {LoginForm.touched.password && LoginForm.errors.password}
                  </FormHelperText>
                </FormControl>
                <Grid item xs={7}>
                  <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
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
