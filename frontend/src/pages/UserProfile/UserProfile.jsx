import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaPhoneAlt, FaCity } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { snackbarActions } from "../../store/snackbar";
import { RingLoader } from "react-spinners";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.activeUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    location: "",
  });

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
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/user/update_profile`,
        { ...form, _id: user._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(data);
      setLoading(false);
      const updatedUser = { ...data.user, token: user.token };

      dispatch(
        snackbarActions.openSnackbar({
          text: data.message,
          severity: "success",
        })
      );

      dispatch(authActions.login(updatedUser));
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (err) {
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
            className={`wrapper relative bg-transparent border-2 border-white/20 backdrop-blur-md shadow-md text-gray-900 rounded-lg p-8 flex items-center transition-all`}
          >
            <div className="w-full md:p-8">
              <form onSubmit={submitHandler}>
                <h1 className="text-3xl font-bold text-center mb-8">
                  My Profile
                </h1>

                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative w-full h-12">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="email"
                      value={form.email}
                      placeholder="Email"
                      required
                      className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                    />
                    <MdEmail className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                  </div>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="relative w-full h-12">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="name"
                      value={form.name}
                      placeholder="Name"
                      required
                      className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                    />
                    <FaUser className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                  </div>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="relative w-full h-12">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="phone"
                      value={form.phone}
                      placeholder="Phone"
                      required
                      className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                    />
                    <FaPhoneAlt className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                  </div>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="relative w-full h-12">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="location"
                      value={form.location}
                      placeholder="Location"
                      required
                      className="w-full h-full bg-transparent outline-none border-2 border-gray-300 rounded-full text-base px-4 pr-12 placeholder-gray-600"
                    />
                    <FaCity className="icon absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="loginbtn w-full h-12 bg-black text-white rounded-full shadow-md font-medium text-base mt-4 cursor-pointer hover:bg-gray-800 transition"
                >
                  Save Changes
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

export default UserProfile;

// return (
//   <>
//     <div className="logbox">
//       <div className={`wrapper`}>
//         <div className="form-box login">
//           <form onSubmit={submitHandler}>
//             <h1>My Profile</h1>

//             <div style={{ margin: "30px 0" }}>
//               <label htmlFor="email">Email</label>
//               <div className="input-box" style={{ margin: "0" }}>
//                 <input
//                   type="text"
//                   onChange={handleChange}
//                   name="email"
//                   value={form.email}
//                   placeholder="Email"
//                   required
//                 />
//                 <MdEmail className="icon" />
//               </div>
//             </div>

//             <div style={{ margin: "30px 0" }}>
//               <label htmlFor="name">Full Name</label>
//               <div className="input-box" style={{ margin: "0" }}>
//                 <input
//                   type="text"
//                   onChange={handleChange}
//                   name="name"
//                   value={form.name}
//                   placeholder="Name"
//                   required
//                 />
//                 <FaUser className="icon" />
//               </div>
//             </div>

//             <div style={{ margin: "30px 0" }}>
//               <label htmlFor="phoen">Phone</label>
//               <div className="input-box" style={{ margin: "0" }}>
//                 <input
//                   type="text"
//                   onChange={handleChange}
//                   name="phone"
//                   value={form.phone}
//                   placeholder="Phone"
//                   required
//                 />
//                 <FaPhoneAlt className="icon" />
//               </div>
//             </div>

//             <div style={{ margin: "30px 0" }}>
//               <label htmlFor="location">City</label>
//               <div className="input-box" style={{ margin: "0" }}>
//                 <input
//                   type="text"
//                   onChange={handleChange}
//                   name="location"
//                   value={form.location}
//                   placeholder="Location"
//                   required
//                 />
//                 <FaCity className="icon" />
//               </div>
//             </div>

//             <button className="loginbtn" type="submit">
//               Save Changes
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   </>
// );
