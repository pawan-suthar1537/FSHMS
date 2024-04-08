const express = require("express");
const { makeappoinement ,getallappoinements,updatestatus,deleteappoinement} = require("../controllers/appoinrment");
const { validateToken , Admin } = require("../utils/token");

const router = express.Router();

router.post("/makeappoinement",validateToken, makeappoinement) 
router.get("/getall",validateToken, Admin, getallappoinements) 
router.put("/updatestatus/:id",validateToken,Admin, updatestatus ) 
router.delete("/delete/:id",validateToken,Admin, deleteappoinement ) 




module.exports = router;
