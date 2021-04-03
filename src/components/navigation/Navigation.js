import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {

  const logout = () => {
    localStorage.removeItem("jwt");
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {localStorage.getItem("jwt") ? (
          <>
            <li>
              <a href="/#" onClick={logout}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav >
  )
};

export default Navigation;
