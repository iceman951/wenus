import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Axios } from "../components/HttpClient";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";

let theme = createMuiTheme({
  typography: {
    fontSize: 25,
  },
});
theme = responsiveFontSizes(theme);

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
          if (err.response.status === 404) {
            actions.setFieldError("email", "บัญชีนี้ไม่ได้รับการลงเทียน");
          } else if (err.response.status === 401) {
            actions.setFieldError("password", "รหัสผ่านไม่ถูกต้อง");
          }

          // console.error(err.response);
        });
    },
  });

  return (
    <form onSubmit={LoginForm.handleSubmit}>
      <FormControl fullWidth variant="outlined" style={{ marginBottom: 20 }}>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <OutlinedInput
          id="login-email"
          name="email"
          label="Email Address"
          type="email"
          autoFocus={true}
          onChange={LoginForm.handleChange}
          defaultValue={LoginForm.values.email}
          size="normal"
        />
        <FormHelperText
          error={LoginForm.touched.email && Boolean(LoginForm.errors.email)}
          id="login-email"
        >
          {LoginForm.touched.email && LoginForm.errors.email}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth variant="outlined" style={{ marginBottom: 20 }}>
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
      <Button
        size="large"
        fullWidth
        variant="contained"
        type="submit"
        color="primary"
      >
        Sign in
      </Button>
    </form>
  );
}

export default LoginForm;
