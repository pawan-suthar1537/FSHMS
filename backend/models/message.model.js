const mongoose = require("mongoose");
const validator = require("validator");

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [10, "message must be at least 10 characters"],
  },
});

const message = mongoose.model("message", messageSchema);
module.exports = message;
