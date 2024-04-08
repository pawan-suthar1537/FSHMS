const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
const cors = require("cors");
const connectDB = require("./utils/db");
const cookieParser = require("cookie-parser");

//!middlewares
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

//! routes import
const messageroute =  require("./router/message.router");
const userroute =  require("./router/user.router");
const appointmentroutes =  require("./router/appointment.router");



//! routes use
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World from FSHMS server" });
});
app.use("/api/v1/message", messageroute);
app.use("/api/v1/user", userroute);
app.use("/api/v1/appointment", appointmentroutes);

//! server start
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server start http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1);
  });
