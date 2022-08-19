const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const userInfo = require("./model/userInfo");
let dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 9870;
const cors = require("cors");
app.use(cors());
const AuthController = require("./controller/authController");
app.get("/", (req, res) => {
  res.send("Express server is running");
});
// # to create user info doc
app.post("/userCourseInfo", (req, res) => {
  userInfo.create(
    {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      universityName: req.body.universityName,
      facultyProfile: req.body.facultyProfile,
      learningHours: req.body.learningHours,
      price: req.body.price,
      certificateUrl: req.body.certificateUrl,
      eligibilityCriteria: req.body.eligibilityCriteria,
    },
    (err, data) => {
      if (err) return res.status(500).send("Error While Register");
      res.status(200).send("info submitted Successful");
    }
  );
});
//  # to get all course info of user
app.get("/getAllInfo", (req, res) => {
  userInfo.find({}, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
//  # to update user info of user
app.put("/updateCourse/:id", (req, res) => {
  let oid = req.params.id;
  userInfo.updateOne(
    { _id: oid },
    {
      $set: {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        universityName: req.body.universityName,
        facultyProfile: req.body.facultyProfile,
        learningHours: Number(req.body.learningHours),
        price: Number(req.body.price),
        certificateUrl: req.body.certificateUrl,
        eligibilityCriteria: req.body.eligibilityCriteria,
      },
    },
    (err, result) => {
      if (err) return res.send("error while updating");
      res.send(result);
    }
  );
});
// # to delete userInfo from
app.delete('/deleteInfo/:id', (req, res) => {
  let oid = req.params.id
 userInfo.remove({ _id: oid }, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});
app.use("/api/auth", AuthController);
// # Now the route will be like /api/auth/authorization_controller_route
// ! mean ahead logic is handed to auth controller
app.listen(port, () => {
  console.log(`listing to port : ${port}`);
});
