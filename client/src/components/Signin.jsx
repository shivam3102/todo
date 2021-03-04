import React, { useState } from "react";
import SigninImg from "../Images/social-feed-colour.svg";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { signin, authenticate, isAuthenticate } from "../auth/index";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirect: false,
  });

  const { user } = isAuthenticate();
  

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  const onError = (error) => {
    toast.error(`${error}`);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const { email, password } = values;
    signin({ email, password })
      .then((response) => {
        if (response.error) {
          setValues((preValues) => {
            return { ...preValues, error: response.error };
          });
          onError(response.error);
        } else {
          authenticate(response, () => {
            setValues((preValues) => {
              return {
                ...preValues,
                email: "",
                password: "",
                error: "",
                redirect: true,
              };
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (values.redirect) {
      if (user) {
        return <Redirect to="/todo" />;
      }
    } else {
      <Redirect to="/" />;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6">
          <img src={SigninImg} alt="signup" />
        </div>
        <div className="col s12 m6">
          <h3 className="center-align">Signin</h3>
          <form>
            <div className="row signup">
              <div className="input-field col m12">
                <input
                  placeholder="enter your email"
                  name="email"
                  value={values.email}
                  onChange={onChangeHandler}
                  type="email"
                  className="validate"
                />
                <label htmlFor="email" className="active">
                  <h6>Email</h6>
                </label>
              </div>
              <div className="input-field col m12">
                <input
                  placeholder="enter your password"
                  name="password"
                  value={values.password}
                  onChange={onChangeHandler}
                  type="password"
                  className="validate"
                />
                <label htmlFor="password" className="active">
                  <h6>Password</h6>
                </label>
              </div>
              <div className="input-field col m12">
                <button
                  className="waves-effect waves-light btn"
                  onClick={onSubmitHandler}
                >
                  Signin
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {performRedirect()}
    </div>
  );
};

export default Signin;
