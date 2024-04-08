const Asyncawait = require("../utils/AsyncAwait");
const User = require("../models/user.model");
const appointment = require("../models/appointment.model");

exports.makeappoinement = Asyncawait(async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor_firstname,
      doctor_lastname,
      isvisited,
      address,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctor_firstname ||
      !doctor_lastname ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isconflict = await User.find({
      firstname: doctor_firstname,
      lastname: doctor_lastname,
      role: "doctor",
      docdepartment: department,
    });

    if (isconflict.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No doctor found",
      });
    }
    if (isconflict.length > 1) {
      return res.status(400).json({
        success: false,
        message: "Doctor Conflict please contact threw email or phone",
      });
    }

    const doctorId = isconflict[0]._id;
    const patientId = req.user._id;

    const newappontment = new appointment({
      firstname,
      lastname,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstname: doctor_firstname, // Corrected field name
        lastname: doctor_lastname, // Corrected field name
      },
      doctor_department: department,
      doctorId: doctorId,
      patientId: patientId,
      isvisited,
      address,
    });

    await newappontment.save();

    res.status(200).json({
      success: true,
      message: "Appointment created successfully",
      data: newappontment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.getallappoinements = Asyncawait(async (req, res) => {
  try {
    const allappoinments = await appointment.find();
    if (allappoinments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No appointment found",
      });
    }
    res.status(200).json({
      success: true,
      data: allappoinments,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.updatestatus = Asyncawait(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedappointment = await appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: updatedappointment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.deleteappoinement = Asyncawait(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedappointment = await appointment.findByIdAndDelete(id);
    if (!deletedappointment) {
      return res.status(400).json({
        success: false,
        message: "No appointment found to delete",
      });
    }
    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
      data: deletedappointment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
