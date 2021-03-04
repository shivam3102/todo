import React, { useState } from "react";
import SignupImg from "../Images/unlock.svg";
import { signup } from "../auth/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  const onSuccess = () => {
    toast.success("Account created please signin!", { autoClose: 7000 });
  };

  const onError = (error) => {
    toast.error(`${error}`);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const { name, email, password } = values;
    signup({ name, email, password }).then((response) => {
      if (response.error) {
        setValues((preValues) => {
          return { ...preValues, error: response.error };
        });
        onError(response.error);
      } else {
        setValues((preValues) => {
          return {
            ...preValues,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          };
        });
        onSuccess();
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6">
          <img src={SignupImg} alt="signup" />
        </div>
        <div className="col s12 m6">
          <h3 className="center-align">Signup</h3>
          <form>
            <div className="row signup">
              <div className="input-field col m12">
                <input
                  placeholder="enter your name"
                  name="name"
                  value={values.name}
                  onChange={onChangeHandler}
                  type="text"
                  className="validate"
                />
                <label htmlFor="name" className="active">
                  <h6>First Name</h6>
                </label>
              </div>
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
                  className="validate mt-4"
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
                  Signup
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
