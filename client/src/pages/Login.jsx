import React, { useState } from "react";
import "../styles/login.scss";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6010/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loggedIn = await response.json();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmitUser}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login in</button>
        </form>
        <a href="/register">Don't have an account? Sign up here</a>
      </div>
    </div>
  );
};

export default Login;

