import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../styles/modules/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const errors = {
  //   uname: "invalid username",
  //   pass: "invalid password",
  // };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // var { uname, pass } = document.forms[0];
    const form = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    await axios
      .post("http://localhost:4000/api/aya/users/signup", form)
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
          toast.success("Success");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    // console.log(res);
    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>userName </label>
          <input type="text" name="username" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Email Address </label>
          <input type="text" name="email" required />
          {renderErrorMessage("uname")}
        </div>

        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="confirmPassword" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div>
        <p style={{ fontSize: "15px" }}>
          Already have an account?
          <Link to={"/login"}>
            <span style={{ color: "orangered" }}>Sign in </span>
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Register</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
};

export default Register;
