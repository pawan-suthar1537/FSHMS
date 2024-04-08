const express = require("express");
const { sendmsg, getmsg } = require("../controllers/message");
const { validateToken, Admin } = require("../utils/token");
const router = express.Router();

router.post("/send", sendmsg);
router.get("/getmsg", validateToken, Admin, getmsg);

module.exports = router;
