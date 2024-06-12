import React, { useEffect, useState } from "react";
import "../Signup/Signup.css";
import { FaUser, FaLock, FaPhoneAlt, FaCity } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/store";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UserProfile = () => {
  const user = useSelector((state) => state.activeUser);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    location: "",
  });
  const [snackbar, setSnackbar] = useState(false);
  const [snackText, setSnackText] = useState({});

  useEffect(() => {
    setForm({
      email: user.email,
      name: user.name,
      phone: user.phone,
      location: user.location,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/user/update_profile",
        { ...form, _id: user._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(data);
      const updatedUser = { ...data.user, token: user.token };

      setSnackText({
        text: data.message,
        severity: "success",
      });
      setSnackbar(true);

      dispatch(authActions.login(updatedUser));
      setTimeout(() => {
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }, 2500);
    } catch (err) {
      setSnackText({
        text: err.response.data.message,
        severity: "error",
      });
      setSnackbar(true);
    }
  };

  return (
    <>
      <div className="logbox">
        <div className={`wrapper`}>
          <div className="form-box login">
            <form onSubmit={submitHandler}>
              <h1>My Profile</h1>

              <div style={{ margin: "30px 0" }}>
                <label htmlFor="email">Email</label>
                <div className="input-box" style={{ margin: "0" }}>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={form.email}
                    placeholder="Email"
                    required
                  />
                  <MdEmail className="icon" />
                </div>
              </div>

              <div style={{ margin: "30px 0" }}>
                <label htmlFor="name">Full Name</label>
                <div className="input-box" style={{ margin: "0" }}>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="name"
                    value={form.name}
                    placeholder="Name"
                    required
                  />
                  <FaUser className="icon" />
                </div>
              </div>

              <div style={{ margin: "30px 0" }}>
                <label htmlFor="phoen">Phone</label>
                <div className="input-box" style={{ margin: "0" }}>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="phone"
                    value={form.phone}
                    placeholder="Phone"
                    required
                  />
                  <FaPhoneAlt className="icon" />
                </div>
              </div>

              <div style={{ margin: "30px 0" }}>
                <label htmlFor="location">City</label>
                <div className="input-box" style={{ margin: "0" }}>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="location"
                    value={form.location}
                    placeholder="Location"
                    required
                  />
                  <FaCity className="icon" />
                </div>
              </div>

              <button className="loginbtn" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert
          severity={snackText.severity}
          variant="filled"
          sx={{ width: "300px" }}
        >
          {snackText.text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserProfile;
