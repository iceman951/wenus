import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Axios } from "../components/HttpClient";

import {
  Grid,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";

const RegisterForm = () => {
  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your First Name")
      .min(5, "First Name should be of minimum 5 characters length")
      .required("First Name is required"),
    lastName: yup
      .string("Enter your Last Name")
      .min(5, "Last Name should be of minimum 5 characters length")
      .required("Last Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(5, "Password should be of minimum 5 characters length")
      .required("Password is required"),
    birthdate: yup
      .date("Enter a valid Birth Date")
      .required("Birth Date is required"),
    faculty: yup
      .string("Enter a valid Faculty")
      .required("Faculty is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthdate: "",
      faculty: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      Axios.post(`/users/register`, values)
        .then((res) => {
          if (res.data.success) {
            actions.resetForm();
          }
          // console.log(res.data);
          // console.log(res);
        })
        .catch((err) => {
          actions.setFieldError("email", "อีเมลนี้ได้ลงทะเบียนแล้ว");
          // console.error(err);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="firstName">FirstName</InputLabel>
                <OutlinedInput
                  id="firstName"
                  name="firstName"
                  label="FirstName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                <FormHelperText
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  id="firstName"
                >
                  {formik.touched.firstName && formik.errors.firstName}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="lastName">LastName</InputLabel>
                <OutlinedInput
                  id="lastName"
                  name="lastName"
                  label="LastName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                <FormHelperText
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  id="firstName"
                >
                  {formik.touched.lastName && formik.errors.lastName}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="register-email">Email Address</InputLabel>
                <OutlinedInput
                  id="register-email"
                  name="email"
                  label="Email Address"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <FormHelperText
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  id="register-email"
                >
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="register-password">Password</InputLabel>
                <OutlinedInput
                  id="register-password"
                  name="password"
                  label="Password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <FormHelperText
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  id="register-password"
                >
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="faculty">Faculty</InputLabel>
                <Select
                  id="faculty"
                  name="faculty"
                  label="Faculty"
                  value={formik.values.faculty}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={"Agro"}>Agro</MenuItem>
                  <MenuItem value={"Dentistry"}>Dentistry</MenuItem>
                  <MenuItem value={"Economics"}>Economics</MenuItem>
                  <MenuItem value={"Engineering"}>Engineering</MenuItem>
                  <MenuItem value={"Environmental Management"}>
                    Environmental Management
                  </MenuItem>
                  <MenuItem value={"Liberal Arts"}>LiberalArts</MenuItem>
                  <MenuItem value={"Management Sciences"}>
                    Management Sciences
                  </MenuItem>
                  <MenuItem value={"Medical Technology"}>
                    Medical Technology
                  </MenuItem>
                  <MenuItem value={"Medicine"}>Medicine</MenuItem>
                  <MenuItem value={"Natural Resources"}>
                    Natural Resources
                  </MenuItem>
                  <MenuItem value={"Nursing"}>Nursing</MenuItem>
                  <MenuItem value={"Pharmaceutical Sciences"}>
                    Pharmaceutical Sciences
                  </MenuItem>
                  <MenuItem value={"Science"}>Science</MenuItem>
                  <MenuItem value={"Traditional Thai Medicine"}>
                    Traditional Thai Medicine
                  </MenuItem>
                  <MenuItem value={"Veterinary Science"}>
                    Veterinary Science
                  </MenuItem>
                </Select>
                <FormHelperText
                  error={
                    formik.touched.faculty && Boolean(formik.errors.faculty)
                  }
                  id="faculty"
                >
                  {formik.touched.faculty && formik.errors.faculty}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="birthdate" shrink>
                  Birthdate
                </InputLabel>
                <OutlinedInput
                  id="birthdate"
                  name="birthdate"
                  label="Birthdate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.birthdate}
                />
                <FormHelperText
                  error={
                    formik.touched.birthdate && Boolean(formik.errors.birthdate)
                  }
                  id="birthdate"
                >
                  {formik.touched.birthdate && formik.errors.birthdate}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={6}>
            <Button
              size="large"
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
            >
              SIGN UP
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
