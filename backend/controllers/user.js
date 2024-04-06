const Asyncawait = require("../utils/AsyncAwait");
const User = require("../models/user.model");
const { getToken } = require("../utils/token");
const bcryptjs = require("bcryptjs");

exports.patientregister = Asyncawait(async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      gender,
      dob,
      role,
      nic,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !dob ||
      !role ||
      !nic
    ) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      firstname,
      lastname,
      email,
      password,
      phone,
      gender,
      dob,
      role,
      nic,
    });

    const saveduser = await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: saveduser,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

exports.login = Asyncawait(async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (role !== user.role) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = getToken(user);

    res
      .status(200)
      .json({ success: true, message: `${role} Login successful`, token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});
