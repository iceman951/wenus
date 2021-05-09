
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
 
 const validate = values => {
   const errors = {};
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
 
   return errors;
 };

 function LoginForm({ setToken }) {

   const formik = useFormik({
     initialValues: {
       email: '',
       password: '',
     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
       axios.post(`https://guarded-falls-57008.herokuapp.com/users/login`, values)
      .then(res => {
        console.log(res.data.access_token)
        setToken(res.data.access_token);
      });
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="loginEmail">Email Address</label>
       <input
         id="loginEmail"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
       {formik.errors.email ? <div>{formik.errors.email}</div> : null}

       <label htmlFor="loginPassword">Password</label>
       <input
         id="loginPassword"
         name="password"
         type="password"
         onChange={formik.handleChange}
         value={formik.values.password}
       />
       {formik.errors.password ? <div>{formik.errors.password}</div> : null}
 
       <button type="submit">Submit</button>
     </form>
   );
 };


export default LoginForm;