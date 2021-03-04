import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticate, signout } from "../auth/index";

const Navbar = (props) => {
  const [sidenav, setSidenav] = useState(false);

  const checkStatus = () => {
    setSidenav(!sidenav);
  };

  return (
    <React.Fragment>
      <nav>
        <div className="nav-wrapper">
          <span className="brand-logo">PRECILY</span>
          <a className="sidenav-trigger">
            <i className="material-icons chekc" onClick={checkStatus}>
              menu
            </i>
          </a>
          <ul id="nav-mobile" className="box right hide-on-med-and-down">
            {!isAuthenticate() && (
              <React.Fragment>
                <li>
                  <Link to="/">Signup</Link>
                </li>
                <li>
                  <Link to="/signin">Signin</Link>
                </li>
              </React.Fragment>
            )}
            {isAuthenticate() && (
              <li onClick={() => signout(() => props.history.push("/"))}>
                <Link to="/signout">Signout</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div
        className="opa"
        onClick={checkStatus}
        style={
          !sidenav
            ? { display: "none", opacity: 0 }
            : { display: "block", opacity: 1 }
        }
      ></div>
      <ul
        className="sidenav"
        style={
          !sidenav
            ? { transform: "translateX(-100%)" }
            : { transform: "translateX(0%)" }
        }
        onClick={checkStatus}
      >
        {!isAuthenticate() && (
          <React.Fragment>
            <li>
              <Link to="/">Signup</Link>
            </li>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
          </React.Fragment>
        )}
        {isAuthenticate() && (
          <li onClick={() => signout(() => props.history.push("/"))}>
            <Link to="/signout">Signout</Link>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default withRouter(Navbar);
