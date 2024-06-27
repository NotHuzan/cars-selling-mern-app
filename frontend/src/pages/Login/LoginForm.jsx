import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const LoginForm = () => {
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.activeUser);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const registerLink = () => {
    setAction(" active");
  };

  const loginLink = () => {
    setAction("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        form
      );
      console.log(data);
      const user = { ...data.user, token: data.token };
      dispatch(authActions.login(user));
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="logbox">
      <div className={`wrapper${action}`}>
        <div className="form-box login">
          <form action="" onSubmit={submitHandler}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <FaLock className="icon" />
            </div>

            <div className="remember-forget">
              <label>
                <input type="checkbox" />
                Remember me{" "}
              </label>
              <a href="#"> Forgot password?</a>
            </div>

            <button className="loginbtn" type="submit">
              Login
            </button>

            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <Link href="#" to="/signup">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
