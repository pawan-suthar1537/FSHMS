const express = require("express");
const { sendmsg } = require("../controllers/message");
const router = express.Router();

router.post("/send", sendmsg);

module.exports = router;
