const express = require("express");
const {
  patientregister,
  login,
  addadmin,
  getalldoctors,
  getcurrentuserdetails,
  getpatientdetails,
  adddoctor,
} = require("../controllers/user");
const upload = require("../utils/multer");

const { validateToken, Admin } = require("../utils/token");
const router = express.Router();

router.post("/patient/register", patientregister);
router.post("/admin/addnew", validateToken, Admin, addadmin);
router.get("/doctors", getalldoctors);
router.get("/admin/me", validateToken, getcurrentuserdetails);
router.get("/patient/me", validateToken, getpatientdetails);
router.post("/login", login);
router.post("/doctor/add",upload.single("docprofile"), validateToken, Admin, adddoctor);

module.exports = router;
