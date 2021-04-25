import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Redirect } from "react-router";

let schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required()
})

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = ({ email, password }) => {
    axios
      .post("http://localhost:8080/login", { email, password })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }

        localStorage.setItem(
          "jwt",
          response.headers.authorization.split(" ")[1]
        )

        return <Redirect to="/" />
      })
      .catch(error => {
        let errs = error.response.data.violations;
        Object.keys(errs).forEach(key => {
          setError(key, {
            message: errs[key]
          });
        });
      })
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input name="email" ref={register} {...register("email")} />
        <p>{errors.email?.message}</p>

        <label htmlFor="password">Password</label>
        <input name="password" type="password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
