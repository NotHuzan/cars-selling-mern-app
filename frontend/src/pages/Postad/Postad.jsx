import React, { useEffect, useState } from "react";
import "./Postad.css";
import image0 from "./0.png";
import image1 from "./1.png";
import image2 from "./2.png";
import image3 from "./3.png";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../../store/snackbar";
import { RingLoader } from "react-spinners";

const PostAd = ({ type }) => {
  const [editCarId, setEditCarId] = useState(false);
  const [form, setForm] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.activeUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { carId } = useParams();

  const fetchCar = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/car/car/${carId}`
      );
      setLoading(false);
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
    } catch (err) {
      setLoading(false);
      console.log("Error : ", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    }

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
    const files = Array.from(e.target.files);
    setForm((prevForm) => ({
      ...prevForm,
      images: files,
    }));

    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(previews).then((images) => setImagePreviews(images));
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

    setLoading(true);
    try {
      if (editCarId) {
        console.log(formData);
        const { data } = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/user/editad/${editCarId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(data);
        setLoading(false);
        dispatch(
          snackbarActions.openSnackbar({
            text: data.message,
            severity: "success",
          })
        );
        navigate("/myads");
      } else {
        console.log(formData);
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/user/postad`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(data);
        setLoading(false);
        dispatch(
          snackbarActions.openSnackbar({
            text: data.message,
            severity: "success",
          })
        );
        navigate("/");
      }
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
        <div className="flex flex-col items-center px-4 py-8 bg-gray-100 min-h-screen">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mt-4">
            Sell your Car With 3 Easy & Simple Steps!
          </h1>
          <p className="text-center text-gray-600 mt-2 mb-6">
            It's free and takes less than a minute
          </p>
          <div className="flex flex-col md:flex-row flex-wrap justify-between items-center w-full max-w-3xl mb-6">
            <div className="m30 flex flex-col items-center p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0 md:w-1/4 w-2/3">
              <img src={image0} alt="Step 1" className="mb-2" />
              <span className="text-center">Enter Your Car Information</span>
            </div>
            <div className="m30 flex flex-col items-center p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0 md:w-1/4 w-2/3">
              <img src={image1} alt="Step 2" className="mb-2" />
              <span className="text-center">Upload Photos</span>
            </div>
            <div className="m30 flex flex-col items-center p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0 w-2/3 md:w-1/4">
              <img src={image2} alt="Step 3" className="mb-2" />
              <span className="text-center">Enter Your Selling Price</span>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto md:p-8 bg-white rounded-lg shadow-lg">
            <form
              className="flex flex-col space-y-4 p-8"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-semibold mb-2">Car Information</h2>
              <p className="text-sm text-gray-500">
                (All fields marked with * are mandatory)
              </p>
              <label className="flex flex-col">
                Make *
                <input
                  type="text"
                  name="make"
                  value={form.make}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <label className="flex flex-col">
                Model *
                <input
                  type="text"
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <label className="flex flex-col">
                Type *
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="SUV">SUV</option>
                  <option value="Crossover">Crossover</option>
                </select>
              </label>
              <label className="flex flex-col">
                Engine *
                <input
                  type="text"
                  name="engine"
                  value={form.engine}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <label className="flex flex-col">
                Year *
                <input
                  type="text"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <label className="flex flex-col">
                Mileage *
                <input
                  type="text"
                  name="mileage"
                  value={form.mileage}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <label className="flex flex-col">
                Price *
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <label className="flex flex-col">
                Condition *
                <select
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select condition
                  </option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </label>
              <label className="flex flex-col">
                FuelType *
                <select
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select fuel type
                  </option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Plug-In Hybrid">Plug-In Hybrid</option>
                </select>
              </label>
              <label className="flex flex-col">
                Transmission *
                <select
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select transmission
                  </option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </label>
              <label className="flex flex-col">
                Color *
                <input
                  type="text"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <label className="flex flex-col">
                Location *
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <label className="flex flex-col">
                Description *
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 border border-gray-300 rounded"
                />
              </label>
              <div className="border-dashed border-2 border-green-800 p-4 text-center mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>
                <input
                  type="file"
                  accept="image/jpeg, image/jpg, image/png, image/gif"
                  multiple
                  onChange={handleFileChange}
                  className="block mx-auto mb-4"
                />
                <div className="flex flex-wrap justify-center mb-3">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index}`}
                      className="m-2 border border-gray-300 object-cover sm:w-32 sm:h-32 md:w-40 md:h-40"
                      // style={{ maxWidth: "150px" }}
                    />
                  ))}
                </div>

                <p className="flex items-center justify-center mx-auto mb-2">
                  <img
                    src={image3}
                    alt="Upload guideline"
                    className="w-8 h-8 mr-2"
                  />
                  Adding at least 8 pictures improves the chances for a quick
                  sale.
                </p>
                <p className="flex items-center justify-center mx-auto mb-2">
                  <img
                    src={image3}
                    alt="Upload guideline"
                    className="w-8 h-8 mr-2"
                  />
                  Adding clear Front, Back and Interior pictures of your car
                  increases the quality of your Ad and gets you noticed more.
                </p>
                <p className="flex items-center justify-center mx-auto">
                  <img
                    src={image3}
                    alt="Upload guideline"
                    className="w-8 h-8 mr-2"
                  />
                  Photos should be in 'jpeg, jpg, png, gif' format only.
                </p>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
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

export default PostAd;
