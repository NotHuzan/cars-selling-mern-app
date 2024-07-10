import React, { useEffect, useState } from "react";
import axios from "axios";
import Car from "../../components/car/Car";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const UseCars = ({ type, ownerAds, savedAds }) => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [editAd, setEditAd] = useState(false);
  const { search } = useLocation();
  const user = useSelector((state) => state.auth.activeUser);
  search ? console.log(search) : console.log("no search");

  const fetchCars = async () => {
    console.log("fetch");

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/car/usedcars/${type}`
      );
      console.log(data);
      setError(null);
      setCars(data);
    } catch (error) {
      console.log("Error", error);
      setError(error.response.data);
    }
  };

  const searchCar = async () => {
    console.log("search");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/car/usedcars/${search}`
      );
      console.log(data);
      setError(null);
      setCars(data);
    } catch (error) {
      console.log("Error", error);
      setError(error.response.data);
    }
  };

  const fetchUserAds = async () => {
    console.log("ownerAds");

    setEditAd(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/myads/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setError(null);
      setCars(data);
    } catch (error) {
      console.log("Error", error);
      setError(error.response.data.message);
    }
  };

  const fetchSavedAds = async () => {
    console.log("savedAds");

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/saved_ads/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setError(null);
      setCars(data.ads);
    } catch (error) {
      console.log("Error", error);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (search) {
      searchCar();
    } else if (ownerAds) {
      fetchUserAds();
    } else if (savedAds) {
      fetchSavedAds();
    } else fetchCars();
  }, [type, search]);

  return !error ? (
    cars.length === 0 ? (
      <p className="text-center mt-11 mb-11">No Cars</p>
    ) : (
      <div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 font-poppins">
        {cars.map((car) => (
          <Car
            key={car._id}
            make={car.make}
            model={car.model}
            year={car.year}
            mileage={car.mileage}
            price={car.price}
            front_image={car.images}
            id={car._id}
            fuel={car.fuelType}
            imageSrc={car.images[0]}
            edit={editAd}
            reFetch={fetchUserAds}
          />
        ))}
      </div>
    )
  ) : (
    <div>{error}</div>
  );
};

export default UseCars;
