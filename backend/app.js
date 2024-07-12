const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes.js");
const carRouter = require("./routes/carRoutes.js");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    console.log("Connected to mongodb:cluster1/CarsMernDB");
    // populateCars();
    // populateMembers();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());

//routers
app.use("/api/user", userRouter);
app.use("/api/car", carRouter);

// Post Ad Route
// app.post('/postadd', upload.array('images[]'), async (req, res) => {
//   console.log(req.body);
//   try {
//     const imagePaths = req.files.map(file => file.path);
//     const newCarData = {
//       ...req.body,
//       make: req.body.make.toLowerCase(),
//       model: req.body.model.toLowerCase(),
//       images: imagePaths,
//       location: "lahore",
//       owner: "6647488ba3202018f986ed2d",
//     };

//     const car = new Car(newCarData);
//     await car.save();
//     res.status(200).send(car);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error Posting Ad!' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
