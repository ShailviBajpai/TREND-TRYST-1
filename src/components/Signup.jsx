import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Signup.css";
const SignUp = () => {
  console.log("witihn signup");
  console.log("wfergbgfngn");
   const handleSubmit = (values, { setSubmitting }) => {
    console.log("within function", values);
    localStorage.setItem("username", values.email);
    localStorage.setItem("password", values.password);
    alert("Signup successful! Please login.");
    console.log("Signing up...", values);
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = "Required";
            } else if (values.firstName.length < 2) {
              errors.firstName = "Must be at least 2 characters";
            }
            if (!values.lastName) {
              errors.lastName = "Required";
            } else if (values.lastName.length < 2) {
              errors.lastName = "Must be at least 2 characters";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (
              !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,16}/.test(
                values.password
              )
            ) {
              errors.password =
                "Password must be 8-16 characters, with at least one uppercase, one lowercase, one number, and one special character";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Passwords must match";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label>First Name:</label>
                <Field type="text" name="firstName" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <Field type="text" name="lastName" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>
              {/* <Link to="/login"> */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  Sign Up
                </button>
              {/* </Link> */}
            </Form>
          )}
        </Formik>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

