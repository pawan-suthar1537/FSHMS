const mongoose = require("mongoose");
const validator = require("validator");

const appintmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: [3, "firstname must be at least 3 characters"],
  },
  lastname: {
    type: String,
    required: true,
    minLength: [3, "lastname must be at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "phone number must be at least 10 characters"],
    maxlength: [10, "phone number must be at most 10 characters"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [10, "phone number must be at least 10 characters"],
    maxlength: [10, "phone number must be at most 10 characters"],
  },
  dob: {
    type: String,
    required: [true, "Please provide your date of birth"],
  },
  gender: {
    type: String,
    required: [true, "Please provide your gender"],
    enum: ["male", "female"],
  },
  appointment_date: {
    type: String,
    required: [true, "Please provide your appointment date"],
  },
  department: {
    type: String,
    required: [true, "Please provide your department"],
  },
  doctor: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  isvisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: [true, "Please provide your address"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const appointment = mongoose.model("appointment", appintmentSchema);
module.exports = appointment;
