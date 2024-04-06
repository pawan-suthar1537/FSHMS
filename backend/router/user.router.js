const express = require("express");
const { patientregister, login } = require("../controllers/user");
const router = express.Router();

router.post("/patient/register", patientregister);
router.post("/login", login);

module.exports = router;
