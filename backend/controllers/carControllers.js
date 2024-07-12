const Car = require("../models/Car");
const SavedAd = require("../models/SavedAd");

const getCars = async (req, res) => {
  console.log(req.query.search);
  const car = req.query.search;

  let usedCars = null;

  let filter = {};
  if (car) {
    // Split the search query into parts (assuming space-separated make and model)
    const searchParts = car.split(" ");

    // Initialize an empty filter object

    if (searchParts.length === 1) {
      // If only one part is provided, search for either make or model
      const searchTerm = searchParts[0];
      const formattedSearchTerm = searchTerm.toLowerCase();
      // searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
      filter = {
        $or: [{ make: formattedSearchTerm }, { model: formattedSearchTerm }],
      };
    } else if (searchParts.length >= 2) {
      // If two or more parts are provided, assume the first is make and the second is model
      const make = searchParts[0];
      const model = searchParts[1];
      const formattedMake = make.toLowerCase();
      const formattedModel = model.toLowerCase();
      // filter = {
      //   make: formattedMake,
      //   model: formattedModel,
      // };
      filter = {
        make: { $in: [formattedMake, formattedModel] },
        model: { $in: [formattedMake, formattedModel] },
      };
    }

    // let [make, model] = car.split(" ");
    // make = make.charAt(0).toUpperCase() + make.slice(1).toLowerCase();
    // model = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();
    // usedCars = await Car.find(filter);
  }

  usedCars = await Car.find(filter);

  usedCars
    ? res
        .status(usedCars.length > 0 ? 200 : 404)
        .send(usedCars.length > 0 ? usedCars : "No cars found.")
    : res.status(500).send("Error Fetching Cars");
};


const getCarsByType = async (req, res) => {
  let carType = req.params.cartype;
  const usedCars = await Car.find({ type: { $regex: new RegExp(`^${carType}$`, 'i') } });
  usedCars
    ? res.status(200).send(usedCars)
    : res.status(404).send("Error Fetching Cars");
};


const getCarID = async (req, res) => {
  const car = await Car.findById(req.params.id).populate({
    path: "owner",
    select: ["name", "phone", "location"],
  });

  car
    ? res.status(200).send(car)
    : res.status(500).send("Error Fetching Details");
};

module.exports = {
  getCars,
  getCarID,
  getCarsByType,
};

const populateCars = async () => {
  await Car.insertMany([
    {
      owner: "user_id_1",
      make: "Toyota",
      model: "Corolla",
      type: "sedan",
      year: 2018,
      mileage: 50000,
      price: 15000,
      condition: "Used",
      fuelType: "Petrol",
      transmission: "Automatic",
      color: "Black",
      location: "City A, Country A",
      images: ["car_image1.jpg", "car_image2.jpg"],
      postedAt: "2024-05-05T12:00:00Z",
    },
    {
      owner: "user_id_2",
      make: "Honda",
      model: "Accord",
      type: "sedan",
      year: 2020,
      mileage: 20000,
      price: 25000,
      condition: "New",
      fuelType: "Petrol",
      transmission: "Automatic",
      color: "White",
      location: "City B, Country B",
      images: ["car_image3.jpg", "car_image4.jpg"],
      postedAt: "2024-05-05T12:00:00Z",
    },
    {
      owner: "user_id_3",
      make: "Ford",
      model: "F-150",
      type: "pickup",
      year: 2019,
      mileage: 35000,
      price: 30000,
      condition: "Used",
      fuelType: "Petrol",
      transmission: "Automatic",
      color: "Red",
      location: "City C, Country C",
      images: ["car_image5.jpg", "car_image6.jpg"],
      postedAt: "2024-05-05T12:00:00Z",
    },
    {
      owner: "user_id_4",
      make: "Chevrolet",
      model: "Camaro",
      type: "coupe",
      year: 2021,
      mileage: 10000,
      price: 40000,
      condition: "New",
      fuelType: "Petrol",
      transmission: "Automatic",
      color: "Blue",
      location: "City D, Country D",
      images: ["car_image7.jpg", "car_image8.jpg"],
      postedAt: "2024-05-05T12:00:00Z",
    },
    {
      owner: "user_id_6",
      make: "BMW",
      model: "X5",
      type: "SUV",
      year: 2017,
      mileage: 60000,
      price: 35000,
      condition: "Used",
      fuelType: "Diesel",
      transmission: "Automatic",
      color: "Black",
      location: "City E, Country E",
      images: ["car_image9.jpg", "car_image10.jpg"],
      postedAt: "2024-05-05T12:00:00Z",
    },
  ]);
};
