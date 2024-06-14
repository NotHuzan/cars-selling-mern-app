import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Add from "./components/Add/Add";
import Home from "./pages/Home/Home";
import UseCars from "./pages/UseCars/UseCars";
import Car_deatils from "./components/Car_detail/C_detail";
import LoginForm from "./pages/Login/LoginForm";
import Signup from "./pages/Signup/Signup";
import Postad from "./pages/Postad/Postad";
import { useSelector } from "react-redux";
import UserAds from "./pages/UserAds/UserAds";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserSavedAds from "./pages/UserSavedAds/UserSavedAds";

function App() {
  const all = ["Honda Vezel", "Toyota CHR", "Mercedes C180", "BMW 350i"];
  const suv = ["Honda Vezel", "Toyota CHR", "Toyota Revo", "Audi Q7"];
  const sedan = ["Honda Civic", "Ford Mustang", "Mercedes C180", "BMW 350i"];
  const cross = [
    "Hyundai Tucson",
    "Haval H6",
    "Mercedes ECG",
    "Chevrolet Cruise",
  ];

  const isLoggedIn=useSelector(state=>state.isLoggedIn);
  const navigate=useNavigate();

  return (
    // <>
    //   <Navbar stock={all} SUV={suv} SEDAN={sedan} CROSS={cross} />
    //   <Hero></Hero>
    //   <Sedan></Sedan>
    // </>

    <>
      <Navbar stock={all} SUV={suv} SEDAN={sedan} CROSS={cross} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usedcars" element={<UseCars type="" />} />
        <Route path="/usedcars/suv" element={<UseCars type="suv" />} />
        <Route path="/usedcars/sedan" element={<UseCars type="sedan" />} />
        <Route path="/usedcars/crossover" element={<UseCars type="crossover" />}/>
        <Route path="/car/:id" element={<Car_deatils />}></Route>
        <Route path="/postad" element={<Postad type='post'/>}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/myads" element={<UserAds />}></Route>
        <Route path="/saved_ads" element={<UserSavedAds />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/profile/reset_password" element={<PasswordReset type='password' />}></Route>
        <Route path="/editad/:carId" element={<Postad type='edit'/>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
