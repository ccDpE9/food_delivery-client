import React from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import useCart from "../cart/useCart";

const Navigation = () => {
  const { cartVisibility, toggle } = useCart();

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
            <li>
              <a href="/#" onClick={toggle}>
                Cart
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
      <Cart cartVisibility={cartVisibility} toggle={toggle} />
    </nav >
  )
};

export default Navigation;
