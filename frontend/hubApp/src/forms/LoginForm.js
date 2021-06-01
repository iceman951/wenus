import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Login } from "../store/actions/userAction";
import { SocketContext } from "../context/socket";

function LoginForm({ setJwt }) {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  
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


  const joinRooms = (rooms) => {
    socket.emit("join-rooms", rooms);
  };

  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      Login(dispatch, actions, values, joinRooms);
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
