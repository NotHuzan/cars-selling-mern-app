import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./C_detail.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../store/snackbar";
import axios from "axios";
import { RingLoader } from "react-spinners";

// imports for dateTime picker
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const C_detail = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [images, setImages] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [appointment, setAppointment] = useState();
  const user = useSelector((state) => state.auth.activeUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchCar = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/car/car/${id}`
      );
      const result = await response.json();
      setLoading(false);
      setCar(result);
      console.log(car);
      setImages(result.images || []);

      // check if user has saved the ad or not
      if (isLoggedIn) {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/user/is_ad_saved`,
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
      setLoading(false);
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
          `${process.env.REACT_APP_BASE_URL}/api/user/savead`,
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
        dispatch(
          snackbarActions.openSnackbar({
            text: data.message,
            severity: "success",
          })
        );
      } catch (err) {
        console.log(err);
        dispatch(
          snackbarActions.openSnackbar({
            text: err.response.data.message,
            severity: "error",
          })
        );
      }
    } else {
      // add to saved ads
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/user/savead`,
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
        dispatch(
          snackbarActions.openSnackbar({
            text: data.message,
            severity: "success",
          })
        );
      } catch (err) {
        console.log(err);
        dispatch(
          snackbarActions.openSnackbar({
            text: err.response.data.message,
            severity: "error",
          })
        );
      }
    }
  };

  const appointmentDateTimeHandler = (value) => {
    setAppointment({
      dateTime: value.format("YYYY-MM-DD HH:mm"),
      location: car.owner.location,
    });
  };

  const bookAppointmentHandler = async () => {
    // check if user is logged in
    if (!isLoggedIn) navigate("/login", { state: { from: location } });

    // show appointment box
    if (!showAppointment) {
      setShowAppointment(true);
      setAppointment({
        dateTime: dayjs().format("YYYY-MM-DD HH:mm"),
        location: car.owner.location,
      });
    }

    // book appointment
    else if (showAppointment) {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/user/book_appointment`,
          {
            userId: user._id,
            carId: car._id,
            appointmentDate: appointment.dateTime,
            location: appointment.location,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setLoading(false);
        dispatch(
          snackbarActions.openSnackbar({
            text: data.message,
            severity: "success",
          })
        );
      } catch (err) {
        setLoading(false);
        dispatch(
          snackbarActions.openSnackbar({
            text: err.response.data.message,
            severity: "error",
          })
        );
      }
    }
  };

  return (
    <>
      {!loading ? (
        <div className="carDetailContainer">
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
                          ? `${process.env.REACT_APP_BASE_URL}/` + image
                          : image
                      }
                      // src={`${process.env.REACT_APP_BASE_URL}/` + image}
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
                {showAppointment && (
                  <div className="appointment-box">
                    <h2>Book Appointment</h2>
                    <div className="location">
                      <label htmlFor="location">Location:</label>
                      <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={car.owner.location}
                        disabled
                      />
                    </div>
                    <div className="appointment">
                      <label htmlFor="appointment">Date & Time:</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={[
                            "DateTimePicker",
                            "MobileDateTimePicker",
                            "DesktopDateTimePicker",
                            "StaticDateTimePicker",
                          ]}
                        >
                          <DemoItem>
                            <DateTimePicker
                              defaultValue={dayjs()}
                              minDateTime={dayjs()}
                              onChange={appointmentDateTimeHandler}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                )}
                <a onClick={bookAppointmentHandler}>Book an Appointment</a>
              </div>
            ) : null}
          </div>
          <div className="p-6 space-y-8 rounded-md bg-card text-card-foreground">
            <div className="text-center">
              <h1 className="text-left text-4xl font-bold text-red-600">
                PKR {car.price}
              </h1>
              <p className="text-left text-xl font-semibold text-muted-foreground capitalize">
                {car.make} {car.model}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 space-y-4 border rounded-md bg-gray-100 text-muted-foreground">
                <h2 className="text-lg font-semibold">Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Make</p>
                    <p className="text-gray-500 capitalize">{car.make}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Model</p>
                    <p className="text-gray-500 capitalize">{car.model}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Type</p>
                    <p className="text-gray-500">{car.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Year</p>
                    <p className="text-gray-500">{car.year}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Mileage</p>
                    <p className="text-gray-500">{car.mileage}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Condition</p>
                    <p className="text-gray-500">{car.condition}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Fuel Type</p>
                    <p className="text-gray-500">{car.fuelType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Transmission</p>
                    <p className="text-gray-500">{car.transmission}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-500">Color</p>
                    <p className="text-gray-500">{car.color}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-md bg-card text-card-foreground">
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-sm">{car.description}</p>
              </div>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6" /> */}
          </div>
          {/* <div className="second">
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
      </div> */}
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <RingLoader size={50} color={"#010101"} loading={true} />
        </div>
      )}
    </>
  );
};

export default C_detail;
