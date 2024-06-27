import React, { useEffect, useState } from "react";
import "./Postad.css";
import image0 from "./0.png";
import image1 from "./1.png";
import image2 from "./2.png";
import image3 from "./3.png";
import { useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  redirect,
  useParams,
  Form,
} from "react-router-dom";
import axios from "axios";

const PostAd = ({ type }) => {
  const [editCarId, setEditCarId] = useState(false);
  const [form, setForm] = useState({});

  const user = useSelector((state) => state.auth.activeUser);
  const navigate = useNavigate();
  const location = useLocation();
  const { carId } = useParams();

  const fetchCar = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/car/car/${carId}`
      );
      console.log(data);
      setForm({
        owner: data.owner._id,
        make: data.make,
        model: data.model,
        type: data.type,
        engine: data.engine,
        year: data.year,
        mileage: data.mileage,
        price: data.price,
        condition: data.condition,
        fuelType: data.fuelType,
        transmission: data.transmission,
        color: data.color,
        location: data.location,
        description: data.description,
        images: data.images,
      });
      setEditCarId(data._id);
      // setImages(result.images || []);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  useEffect(() => {
    if (!user) {
      // navigate("/login");
      navigate("/login", { state: { from: location } });
    }

    // type === "edit" ? setEdit(true) : setEdit(false);
    if (type === "edit") {
      fetchCar();
    } else {
      setEditCarId(null);
      setForm({
        owner: "",
        make: "",
        model: "",
        type: "",
        engine: "",
        year: "",
        mileage: "",
        price: "",
        condition: "",
        fuelType: "",
        transmission: "",
        color: "",
        location: "",
        description: "",
        images: [],
      });
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    setForm((prevForm) => ({
      ...prevForm,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form[key].forEach((file) => {
          formData.append("images[]", file);
        });
      } else if (key === "owner") {
        formData.append(key, user._id);
      } else {
        formData.append(key, form[key]);
      }
    });

    console.log("Form submitted:", form);

    try {
      let data;
      if (editCarId) {
        console.log(formData);
        const { res } = await axios.put(
          `http://localhost:5000/api/user/editad/${editCarId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        data = res;
        console.log(data);
      } else {
        console.log(formData);
        const { res } = await axios.post(
          "http://localhost:5000/api/user/postad",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        data = res;
        console.log(data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="subbody">
      <h1 className="blue">Sell your Car With 3 Easy & Simple Steps!</h1>
      <p className="center">It's free and takes less than a minute</p>
      <div className="steps">
        <div>
          <img src={image0} alt="Step 1"></img>
          Enter Your Car Information
        </div>
        <div>
          <img src={image1} alt="Step 2"></img>
          Upload Photos
        </div>
        <div>
          <img src={image2} alt="Step 3"></img>
          Enter Your Selling Price
        </div>
      </div>
      <div className="container">
        <form className="car-form" onSubmit={handleSubmit}>
          <h2>Car Information</h2>
          <p>(All fields marked with * are mandatory)</p>
          <label>
            Make *
            <input
              type="text"
              name="make"
              value={form.make}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Model *
            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Type *
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Engine *
            <input
              type="text"
              name="engine"
              value={form.engine}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Year *
            <input
              type="text"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mileage *
            <input
              type="text"
              name="mileage"
              value={form.mileage}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price *
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Condition *
            <input
              type="text"
              name="condition"
              value={form.condition}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            FuelType *
            <input
              type="text"
              name="fuelType"
              value={form.fuelType}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Transmission *
            <input
              type="text"
              name="transmission"
              value={form.transmission}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Color *
            <input
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location *
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description *
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
          <div className="upload-section">
            <h2>Upload Photos</h2>
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png, image/gif"
              multiple
              onChange={handleFileChange}
              // value={form.images}
            />
            <p>
              <img src={image3} alt="Upload guideline"></img>
              Adding at least 8 pictures improves the chances for a quick sale.
            </p>
            <p>
              <img src={image3} alt="Upload guideline"></img>
              Adding clear Front, Back and Interior pictures of your car
              increases the quality of your Ad and gets you noticed more.
            </p>
            <p>
              <img src={image3} alt="Upload guideline"></img>
              Photos should be in 'jpeg, jpg, png, gif' format only.
            </p>
          </div>
          <button className="submit_button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;

// // App.js

// import React from 'react';
// // import './App.css'; // Import your CSS file
// import CarPostForm from '../../components/CarPostForm/carpostform'; // Import your CarPostForm component

// function Postad() {
//   return (
//     <div className="App">
//       <div className="background-image"></div> {/* Background image container */}
//       <h1>Post An Add Form</h1>
//       <CarPostForm />
//     </div>
//   );
// }

// export default Postad;
