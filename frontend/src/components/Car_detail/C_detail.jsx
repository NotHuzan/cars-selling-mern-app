import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./C_detail.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function C_detail() {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [images, setImages] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const user = useSelector((state) => state.activeUser);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [snackbar, setSnackbar] = useState(false);
  const [snackText, setSnackText] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCar = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/car/car/${id}`);
      const result = await response.json();
      setCar(result);
      console.log(car);
      setImages(result.images || []);

      if (isLoggedIn) {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/user/is_ad_saved",
            {
              userId: user._id,
              carId: result._id,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log(data);
          setIsSaved(data.isSaved);
        } catch (err) {
          console.log(err);
          setIsSaved(err.response.data.isSaved);
        }
      }
    } catch (err) {
      console.log("Error : ", err);
    }
  };
  
  useEffect(() => {
    fetchCar();
  }, [id]);

  const saveAdHandler = async () => {
    if (!isLoggedIn) navigate("/login", { state: { from: location } });
    else if (isSaved) {
      // remove from saved ads
      try {
        const { data } = await axios.delete(
          "http://localhost:5000/api/user/savead",
          {
            data: {
              userId: user._id,
              carId: car._id,
            },
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setIsSaved(false);
        setSnackText({
          text: data.message,
          severity: "success",
        });
        setSnackbar(true);
      } catch (err) {
        console.log(err);
        setSnackText({
          text: err.response.data.message,
          severity: "error",
        });
        setSnackbar(true);
      }
    } else {
      // add to saved ads
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/user/savead",
          {
            userId: user._id,
            carId: car._id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setIsSaved(true);
        setSnackText({
          text: data.message,
          severity: "success",
        });
        setSnackbar(true);
      } catch (err) {
        console.log(err);
        setSnackText({
          text: err.response.data.message,
          severity: "error",
        });
        setSnackbar(true);
      }
    }
  };

  return (
    <>
      <div className="parent">
        <div
          id="carouselExampleControls"
          className="carousel slide child1"
          data-ride="carousel"
        >
          <div className="save-btn" title="Save Ad" onClick={saveAdHandler}>
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </div>
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                {/* the condition in src is to check if the imageSrc starts with upload which means that they are stored in uploads of backend folder ,else they are hardcoded from above */}
                <img
                  className="d-block w-100"
                  src={
                    String(image).match("^uploads")
                      ? "http://localhost:5000/" + image
                      : image
                  }
                  // src={'http://localhost:5000/' + image}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        {car.owner ? (
          <div className="child2">
            <h2>Seller Details</h2>
            <h6>Seller Name : {car.owner.name}</h6>
            <h6>Seller Location : {car.owner.location}</h6>
            <h6>Seller Phone Number : {car.owner.phone}</h6>
            <a>Book an Appointment</a>
          </div>
        ) : null}
      </div>
      <div className="second">
        <div className="detail_box">
          <h1>PKR {car.price}</h1>
          <h5>
            {car.make} {car.model}
          </h5>
        </div>
        <div className="detail_box ">
          <h3>Details</h3>
          <div className="detail_box2 ">
            <h6 className="bold">Make</h6>
            <h6>{car.make}</h6>
            <h6 className="bold">Model</h6>
            <h6>{car.model}</h6>
            <h6 className="bold">Type</h6>
            <h6>{car.type}</h6>
            <h6 className="bold">Year</h6>
            <h6>{car.year}</h6>
            <h6 className="bold">Mileage</h6>
            <h6>{car.mileage}</h6>
            <h6 className="bold">Condition</h6>
            <h6>{car.condition}</h6>
            <h6 className="bold">Fuel Type</h6>
            <h6>{car.fuelType}</h6>
            <h6 className="bold">Transmission</h6>
            <h6>{car.transmission}</h6>
            <h6 className="bold">Color</h6>
            <h6>{car.color}</h6>
          </div>
        </div>
        <div className="detail_box ">
          <h3>Description</h3>
          <h6>{car.description}</h6>
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
}
