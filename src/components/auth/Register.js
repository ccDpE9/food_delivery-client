import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";

let schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null], "Password must match"),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/register", data)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response);
        } else {
          alert("You've registered successfully.");
          return <Redirect to="/" />;
        }
      })
      .catch((err) => {
        let errs = err.response.data.violations;
        Object.keys(errs).forEach(key => {
          setError(key, {
            message: errs[key]
          });
        });
      });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First name: </label>
        <input type="text" name="firstName" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>

        <label>Last name: </label>
        <input type="text" name="lastName" {...register("lastName")} />
        <p>{errors.lastName?.message}</p>

        <label>Email: </label>
        <input type="text" name="email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <label>Password</label>
        <input name="password" type="password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <label>Confirm password:</label>
        <input name="confirmPassword" type="password" {...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;