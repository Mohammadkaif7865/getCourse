const express = require('express');
const app = express();
const db = require('./db');
let dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 9870;
const cors = require('cors');
app.use(cors());
const AuthController = require('./controller/authController');
app.get("/", (req, res) => {
    res.send("Express server is running");
  });
app.use("/api/auth", AuthController);
// # Now the route will be like /api/auth/authorization_controller_route
// ! mean ahead logic is handed to auth controller
app.listen(port, () => {
    console.log(`listing to port : ${port}`);
});

