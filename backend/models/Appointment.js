const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },

  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },

  appointmentDate: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "cancelled", "completed"],
    default: "pending",
  },

  location: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;
