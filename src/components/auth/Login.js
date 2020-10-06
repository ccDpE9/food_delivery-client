import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // @TODO: Validatio inputs

    const payload = {
      email: auth.email,
      password: auth.password,
    };

    axios
      .post("localhost:8080/login", payload)
      .then((res) => {
        if (res.status === 200) {
          // @TODO:
          // 1. notify login was successfull
          // 2. redirect
        } else {
          // @TODO:
          // 1. notify login was not successfull
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setAuth((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="login">
      <input type="text" id="email" onChange={handleChange} />
      <input type="password" id="password" onChange={handleChange} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Auth;
