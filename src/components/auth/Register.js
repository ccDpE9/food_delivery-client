import React from "react";

const Register = () => {
  const onSubmit = (data) => {};

  return (
    <div className="register">
      <label>First Name</label>
      <input name="firstName" />

      <label>Email</label>
      <input name="email" />

      <label>Phone number</label>
      <input name="phone" />

      <label>Password</label>
      <input name="password" />

      <label>Confirm password</label>
      <input name="confirmPassword" />

      <button onClick={onSubmit}>Register</button>
    </div>
  );
};

export default Register;
