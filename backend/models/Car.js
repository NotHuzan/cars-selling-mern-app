// const mongoose = require("mongoose");

// const carSchema = new mongoose.Schema({
//   make: { type: String, required: true },
//   model: { type: String, required: true },
//   year: { type: Number, required: true },
//   color: String,
//   mileage: Number,
//   transmission: String,
//   type: String,
//   fuel: String,
//   image: String,
//   price: { type: Number, required: true },
// });

// const Car=mongoose.model("Cars",carSchema);
// module.exports=Car;

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Sedan", "Hatchback", "SUV", "Crossover"],
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    enum: ["New", "Used"],
    default: "Used",
  },
  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "Hybrid", "Electric", "Plug-In Hybrid"],
    default: "Petrol",
  },
  transmission: {
    type: String,
    enum: ["Automatic", "Manual",]
  },
  color: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  description: String,
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
