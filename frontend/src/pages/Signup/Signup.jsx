import React, { useState } from "react";
import "./Signup.css";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { snackbarActions } from "../../store/snackbar";
import { useDispatch } from "react-redux";
import { RingLoader } from "react-spinners";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/signup`,
        form
      );
      // console.log(data);
      setLoading(false);
      dispatch(
        snackbarActions.openSnackbar({
          text: data.message,
          severity: "success",
        })
      );
      navigate("/login");
    } catch (err) {
      // console.log(err.response.data.message);
      setLoading(false);
      dispatch(
        snackbarActions.openSnackbar({
          text: err.response.data.message,
          severity: "error",
        })
      );
    }
  };

  return (
    <>
      {!loading ? (
        <div className="flex justify-center items-center bg-white mt-5">
          <div
            className={`wrapper relative bg-transparent border-2 border-brown-200/20 backdrop-blur-md shadow-md text-gray-900 rounded-lg p-8 flex items-center transition-all`}
          >
            <div className="w-full pt-8 md:p-8">
              <form action="" onSubmit={submitHandler}>
                <h1 className="text-3xl font-bold text-center mb-8">Signup</h1>

                <div className="input-box relative w-full h-12 mb-8">
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                  />
                  <FaUser className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                </div>

                <div className="input-box relative w-full h-12 mb-8">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                  />
                  <FaLock className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                </div>

                <div className="input-box relative w-full h-12 mb-8">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                  />
                  <FaUser className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                </div>

                <div className="input-box relative w-full h-12 mb-8">
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                    className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                  />
                  <FaUser className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                </div>

                <div className="input-box relative w-full h-12 mb-8">
                  <input
                    type="text"
                    name="location"
                    onChange={handleChange}
                    placeholder="Location"
                    required
                    className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                  />
                  <FaUser className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                </div>

                <div className="remember-forget flex justify-between text-sm mb-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-black" />
                    Remember me
                  </label>
                  <a href="#" className="text-gray-700 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button className="loginbtn w-full h-12 bg-black text-white rounded-full shadow-md font-medium text-base mt-4 cursor-pointer hover:bg-gray-800 transition">
                  Signup
                </button>

                <div className="register-link text-sm text-center mt-6">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      href="#"
                      to="/login"
                      className="text-black font-semibold hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>
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

export default Signup;

// return (
//   <div className="logbox">
//     <div className={`wrapper${action}`}>
//       <div className="form-box login">
//         <form action="" onSubmit={submitHandler}>
//           <h1>Signup</h1>
//           <div className="input-box">
//             <input
//               type="text"
//               onChange={handleChange}
//               name="email"
//               placeholder="Email"
//               required
//             />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type="password"
//               onChange={handleChange}
//               name="password"
//               placeholder="Password"
//               required
//             />
//             <FaLock className="icon" />
//           </div>

//           <div className="input-box">
//             <input
//               type="text"
//               onChange={handleChange}
//               name="name"
//               placeholder="Name"
//               required
//             />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type="text"
//               onChange={handleChange}
//               name="phone"
//               placeholder="Phone"
//               required
//             />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input
//               type="text"
//               onChange={handleChange}
//               name="location"
//               placeholder="Location"
//               required
//             />
//             <FaUser className="icon" />
//           </div>

//           <div className="remember-forget">
//             <label>
//               <input type="checkbox" />
//               Remember me{" "}
//             </label>
//             <a href="#"> Forgot password?</a>
//           </div>

//           <button className="loginbtn" type="submit">
//             Login
//           </button>

//           <div className="register-link">
//             <p>
//               Don't have an account?{" "}
//               <Link href="#" to="/login">
//                 Register
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );
