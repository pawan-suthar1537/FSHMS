const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const userSchema = new mongoose.Schema({
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
    type: Date,
    required: [true, "Please provide your date of birth"],
  },
  gender: {
    type: String,
    required: [true, "Please provide your gender"],
    enum: ["male", "female"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [5, "phone number must be at least 5 characters"],
    // select: false,
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["admin", "patient", "doctor"],
  },
  docdepartment: {
    type: String,
  },
  docprofile: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcryptjs.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});


userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};



const user = mongoose.model("user", userSchema);
module.exports = user;
