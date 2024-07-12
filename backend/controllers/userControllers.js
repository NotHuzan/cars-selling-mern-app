const Member = require("../models/Member");
const Car = require("../models/Car");
const SavedAd = require("../models/SavedAd");
const Appointment = require("../models/Appointment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Member.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "Invalid Email!" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invaild Password!" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  console.log("Generated Token\n", token);
  if (req.cookies[`${user._id}`]) {
    req.cookies[`${user._id}`] = "";
  }
  res.cookie(String(user._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 3600),
    // expires: new Date(Date.now() + 1000 * 30)
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Successfully Logged In",
    user: user,
    token,
  });
};

const signup = async (req, res) => {
  // const member = new Member(req.body);
  const { email, password, name, location, phone } = req.body;
  const user = await Member.findOne({ email: email });
  if (user) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashPass = bcrypt.hashSync(password);
  const member = new Member({
    email: email,
    password: hashPass,
    name,
    location,
    phone,
  });

  member
    .save()
    .then(() => {
      return res.status(200).json({ message: "Registered Successfully!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Error Signing Up!" });
    });
};

// Post Ad Route
const postAd = async (req, res) => {
  console.log(req.body);
  try {
    const imagePaths = req.files.map((file) => file.path);
    const newCarData = {
      ...req.body,
      make: req.body.make.toLowerCase(),
      model: req.body.model.toLowerCase(),
      images: imagePaths,
      // location: "lahore",
      // owner: "6647488ba3202018f986ed2d",
    };

    const car = new Car(newCarData);
    await car.save();
    res.status(200).json({ message: "Ad Posted Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Posting Ad!" });
  }
};

const myAds = async (req, res) => {
  console.log(req.params);
  const car = await Car.find({ owner: req.params.id });
  car
    ? res.status(200).send(car)
    : res.status(500).json({ message: "Error Fetching Ads!" });
};

const resetPassword = async (req, res) => {
  const { user, oldPass, newPass } = req.body;
  const member = await Member.findById(user._id);
  if (!member) {
    return res
      .status(500)
      .json({ message: "User Not Found. Please Login Again!" });
  }
  const isPasswordCorrect = bcrypt.compareSync(oldPass, member.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invaild Current Password!" });
  }

  const newHashPass = bcrypt.hashSync(newPass);
  member.password = newHashPass;
  await member.save();
  return res.status(200).json({ message: "Password Changed Succesfully!" });
};

const updateProfile = async (req, res) => {
  const { _id, email, name, phone, location } = req.body;

  const user = await Member.findById(_id);
  if (!user) {
    return res
      .status(500)
      .json({ message: "User Not Found. Please Login Again!" });
  }

  user.email = email;
  user.name = name;
  user.phone = phone;
  user.location = location;

  await user.save();
  return res.status(200).json({ user, message: "Changes Saved Succesfully!" });
};

const getSavedAds = async (req, res) => {
  const { userId } = req.params;

  const ad = await SavedAd.findOne({ owner: userId }).populate({
    path: "ads",
  });

  if (!ad) {
    return res.status(404).json({ message: "No Saved Ads!" });
  }

  return res.status(200).send(ad);
};

const isAdSaved = async (req, res) => {
  const { userId, carId } = req.body;

  // console.log(userId,carId);

  const ad = await SavedAd.findOne({ owner: userId });

  if (!ad) {
    return res.status(404).json({ message: "No Saved Ads!" });
  }

  // not found in saved ads
  const index = ad.ads.findIndex((ad) => ad == carId);
  console.log(index);
  if (index === -1) {
    return res.status(400).json({ isSaved: false });
  }

  // found in saved ads
  return res.status(200).json({ isSaved: true });
};

const saveAd = async (req, res) => {
  const { userId, carId } = req.body;

  const ad = await SavedAd.findOne({ owner: userId });

  if (!ad) {
    const newAd = new SavedAd({
      owner: userId,
      ads: [carId],
    });
    await newAd.save();
    return res.status(200).json({ message: "Ad Saved Successfully!" });
  }

  ad.ads.push(carId);
  await ad.save();
  return res.status(200).json({ message: "Ad Saved Successfully!" });
};

const removeSavedAd = async (req, res) => {
  const { userId, carId } = req.body;

  const ad = await SavedAd.findOne({ owner: userId });

  if (!ad) {
    return res.status(200).json({ message: "Ad is already not saved!" });
  }

  const index = ad.ads.findIndex((ad) => ad == carId);
  ad.ads.splice(index, 1);
  await ad.save();
  return res.status(200).json({ message: "Ad Unsaved Successfully!" });
};

const deleteMyAd = async (req, res) => {
  const { carId } = req.params;

  const del = await Car.findByIdAndDelete(carId);

  if (!del) {
    return res.status(200).json({ message: "Ad already don't exist!" });
  }

  return res.status(200).json({ message: "Ad Deleted Successfully!" });
};

const editMyAd = async (req, res) => {
  const { carId } = req.params;

  try {
    const imagePaths = req.files.map((file) => file.path);
    const newCarData = {
      ...req.body,
      make: req.body.make.toLowerCase(),
      model: req.body.model.toLowerCase(),
      images: imagePaths,
    };

    const car = await Car.findByIdAndUpdate(carId, newCarData);

    return res.status(200).json({ message: "Ad Updated Successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Updating Ad!" });
  }
};

const bookAppointment = async (req, res) => {
  const { userId, carId, appointmentDate, location } = req.body;
  const appointment = await Appointment.findOne({ carId, userId });

  if (appointment) {
    return res
      .status(400)
      .json({ message: "You have already booked the appointment of this Ad!" });
  }

  const newApp = new Appointment({
    userId,
    carId,
    appointmentDate,
    location,
  });

  await newApp.save();

  return res.status(200).json({ message: "Appointment Booked Succesfully!" });
};

const getBookedAppointment = async (req, res) => {
  const { userId } = req.params;
  const appointment = await Appointment.find({userId}).populate({
    path: "carId",
    select: 'make model images' 
  });
  if (!appointment) {
    return res.status(404).json({ message: "No Appointments!" });
  }

  return res.status(200).send(appointment);
};

const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await Appointment.findByIdAndDelete(appointmentId);
  if (!appointment) {
    return res
      .status(404)
      .json({ message: "Appointment already don't exist!" });
  }

  return res
    .status(200)
    .json({ message: "Appointment Cancelled Successfully!" });
};

const completeAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await Appointment.findByIdAndDelete(appointmentId);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment don't exist!" });
  }

  return res.status(200).json({ message: "Appointment Marked as Completed!" });
};

const editAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { appointmentDate, location } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
    $set: { appointmentDate, location },
  });

  if (!appointment) {
    return res.status(404).json({ message: "Appointment Not Found!" });
  }

  return res.status(200).json({ message: "Appointment Updated Successfully!" });
};

module.exports = {
  login,
  signup,
  postAd,
  myAds,
  resetPassword,
  updateProfile,
  getSavedAds,
  isAdSaved,
  saveAd,
  removeSavedAd,
  deleteMyAd,
  editMyAd,
  bookAppointment,
  getBookedAppointment,
  cancelAppointment,
  completeAppointment,
  editAppointment,
};

const populateMembers = async () => {
  await Member.insertMany([
    {
      email: "user456@example.com",
      password: "hashed_password_2",
      name: "Jane Smith",
      phone: "987-654-3210",
      location: "City B, Country B",
    },
    {
      email: "user789@example.com",
      password: "hashed_password_3",
      name: "Alice Johnson",
      phone: "555-555-5555",
      location: "City C, Country C",
    },
    {
      email: "user123@example.com",
      password: "hashed_password_1",
      name: "John Doe",
      phone: "123-456-7890",
      location: "City A, Country A",
    },
    {
      email: "user131415@example.com",
      password: "hashed_password_5",
      name: "Carol Williams",
      phone: "444-444-4444",
      location: "City E, Country E",
    },
    {
      email: "user101112@example.com",
      password: "hashed_password_4",
      name: "Bob Brown",
      phone: "111-222-3333",
      location: "City D, Country D",
    },
    {
      email: "user666@example.com",
      password: "hashed_password_6",
      name: "Joh Smith",
      phone: "987-651-3210",
      location: "City F, Country F",
    },
    {
      email: "user779@example.com",
      password: "hashed_password_7",
      name: "Ben Smith",
      phone: "987-621-3210",
      location: "City F, Country F",
    },
  ]);
};
