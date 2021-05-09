import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthdate: "",
      faculty: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      axios
        .post(
          `https://guarded-falls-57008.herokuapp.com/users/register`,
          values
        )
        .then((res) => {
          console.log(res.data);
          console.log(res);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}

      <label htmlFor="birthdate">birthdate</label>
      <input
        id="birthdate"
        name="birthdate"
        type="birthdate"
        onChange={formik.handleChange}
        value={formik.values.birthdate}
      />
      {formik.errors.birthdate ? <div>{formik.errors.birthdate}</div> : null}

      <label htmlFor="faculty">faculty</label>
      <input
        id="faculty"
        name="faculty"
        type="faculty"
        onChange={formik.handleChange}
        value={formik.values.faculty}
      />
      {formik.errors.faculty ? <div>{formik.errors.faculty}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
