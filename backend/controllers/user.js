const Asyncawait = require("../utils/AsyncAwait");
const User = require("../models/user.model");
const { getToken } = require("../utils/token");
const bcryptjs = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

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

exports.addadmin = Asyncawait(async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, gender, dob, nic } =
      req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !dob ||
      !nic
    ) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const isalreadyexist = await User.findOne({ email });
    if (isalreadyexist) {
      return res
        .status(400)
        .json({ message: `${isalreadyexist.role} already exists` });
    }

    const admin = new User({
      firstname,
      lastname,
      email,
      password,
      phone,
      gender,
      dob,
      nic,
      role: "admin",
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});

exports.getalldoctors = Asyncawait(async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    if (doctors.length === 0)
      return res.status(400).json({ message: "No doctors found" });
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});

exports.getcurrentuserdetails = Asyncawait(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});

exports.getpatientdetails = Asyncawait(async (req, res) => {
  try {
    const patient = await User.findById(req.user._id);
    if (!patient) return res.status(400).json({ message: "Patient not found" });
    res.status(200).json({
      success: true,
      message: "Patient fetched successfully",
      data: patient,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});

exports.adddoctor = Asyncawait(async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      gender,
      dob,
      nic,
      docdepartment,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !dob ||
      !nic ||
      !docdepartment 
     
    ) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (!req.file || Object.keys(req.file).length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload a Avatar for Doctor" });
    }

    const isalreadyexist = await User.findOne({ email });
    if (isalreadyexist) {
      return res
        .status(400)
        .json({ message: `${isalreadyexist.role} already exists with this email` });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "FSHMS/Docavatar",
      use_filename: true,
      unique_filename: false,
    });

    if (!result)
      return res.status(400).json({ message: "Avatar upload failed" });

    const doctor = new User({
      firstname,
      lastname,
      email,
      password,
      phone,
      gender,
      dob,
      nic,
      docdepartment,
      role: "doctor",
      docprofile: result.secure_url,
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: doctor,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});
