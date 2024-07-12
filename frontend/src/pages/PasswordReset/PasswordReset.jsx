import React, { useState } from "react";
import "../Login/LoginForm.css";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { snackbarActions } from "../../store/snackbar";
import { RingLoader } from "react-spinners";

const PasswordReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.activeUser);
  const [oldPass, setOldPassword] = useState("");
  const [newPass, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState();
  const [loading, setLoading] = useState(false);

  console.log(user);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      dispatch(
        snackbarActions.openSnackbar({
          text: "New Password and Confirm Password are different !",
          severity: "error",
        })
      );
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/user/reset_password`,
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
        setLoading(false);
        dispatch(
          snackbarActions.openSnackbar({
            text: data.message,
            severity: "success",
          })
        );
        dispatch(authActions.logout());
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } catch (err) {
        console.log(err.response.data.message);
        setLoading(false);
        if (err.response.status === 400) {
          dispatch(
            snackbarActions.openSnackbar({
              text: err.response.data.message,
              severity: "error",
            })
          );
        } else {
          dispatch(
            snackbarActions.openSnackbar({
              text: err.response.data.message,
              severity: "error",
            })
          );
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
      {!loading ? (
        <div className="flex items-center justify-center mt-5">
          <div className="wrapper relative bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden p-8">
            <div className="w-full md:p-8">
              <form onSubmit={submitHandler}>
                <h1 className="text-2xl font-semibold text-center mb-6">
                  Change Password
                </h1>

                <div className="relative mb-4">
                  <input
                    type="password"
                    name="currentPassword"
                    value={oldPass}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Current Password"
                    required
                    className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg pl-4 pr-10 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                <div className="relative mb-4">
                  <input
                    type="password"
                    name="newPassword"
                    value={newPass}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                    className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg pl-4 pr-10 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                <div className="relative mb-4">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg pl-4 pr-10 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <RingLoader size={50} color={"#010101"} loading={true} />
        </div>
      )}
    </>
  );
};

export default PasswordReset;

// <>
//   <div className="logbox">
//     <div className={`wrapper`}>
//       <div className="form-box login">
//         <form action="" onSubmit={submitHandler}>
//           <h1>Change Password</h1>

//           <div className="input-box">
//             <input
//               type="password"
//               name="currentPassword"
//               value={oldPass}
//               onChange={(e) => setOldPassword(e.target.value)}
//               placeholder="Current Password"
//               required
//             />
//             <FaLock className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type="password"
//               name="newPassword"
//               value={newPass}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="New Password"
//               required
//             />
//             <FaLock className="icon" />
//           </div>

//           <div className="input-box">
//             <input
//               type="password"
//               name="confirmPassword"
//               value={confirmPass}
//               onChange={(e) => setConfirmPass(e.target.value)}
//               placeholder="Confirm Password"
//               required
//             />
//             <FaLock className="icon" />
//           </div>

//           <button className="loginbtn" type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// </>
