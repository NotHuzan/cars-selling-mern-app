import React, { useState } from "react";
import "../Login/LoginForm.css";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/store";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PasswordReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.activeUser);
  const [oldPass, setOldPassword] = useState("");
  const [newPass, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackText, setSnackText] = useState({});

  console.log(user);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      setSnackText({
        text: "New Password and Confirm Password are different !",
        severity: "error",
      });
      setSnackbar(true);
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/user/reset_password",
          { user, oldPass, newPass },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(data);
        // const user = { ...data.user, token: data.token };
        // dispatch(authActions.login(user));
        // const from = location.state?.from?.pathname || "/";
        // navigate(from);
        setSnackText({
          text: data.message,
          severity: "success",
        });
        setSnackbar(true);
        dispatch(authActions.logout());
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } catch (err) {
        console.log(err.response.data.message);
        if (err.response.status === 400) {
          setSnackText({
            text: err.response.data.message,
            severity: "error",
          });
          setSnackbar(true);
        } else {
          setSnackText({
            text: err.response.data.message,
            severity: "error",
          });
          setSnackbar(true);
          dispatch(authActions.logout());
          setTimeout(() => {
            navigate("/login");
          }, 2500);
        }
      }
    }
  };

  return (
    <>
      <div className="logbox">
        <div className={`wrapper`}>
          <div className="form-box login">
            <form action="" onSubmit={submitHandler}>
              <h1>Change Password</h1>

              <div className="input-box">
                <input
                  type="password"
                  name="currentPassword"
                  value={oldPass}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Current Password"
                  required
                />
                <FaLock className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="newPassword"
                  value={newPass}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                />
                <FaLock className="icon" />
              </div>

              <div className="input-box">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
                <FaLock className="icon" />
              </div>

              <button className="loginbtn" type="submit">
                Submit
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

export default PasswordReset;
