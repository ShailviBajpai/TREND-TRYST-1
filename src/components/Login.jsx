import React from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Login.css";

const Login = () => {
     const navigate = useNavigate(); 
  const handleSubmit = (values, { setSubmitting }) => {
    // You can handle form submission here, e.g., send login request
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    console.log("Logging in...", values);
    // Simulating authentication check, replace with actual authentication logic
    if (values.name === savedUsername && values.password === savedPassword) {
      // Successful login
      console.log("Login successful!");
      navigate("/");
      // Redirect to the next screen or perform necessary actions
    } else {
        alert("Invalid credentials, Please sign up again");
      console.log("Invalid credentials!");
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
     <div className="form-container">
      <h2 className="form-title">Login</h2>
      <Formik
        initialValues={{ name: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Email:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="error-message"/>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting} className="submit-button">
              Login
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
   </div>
  );
};

export default Login;

