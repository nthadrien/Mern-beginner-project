require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// Server Routes
const woukoutRoutes = require("./routes/workouts");

// Express app creation
const App = express();

// Middleware
App.use(express.json()); // requests Converts all to json

App.use("/", (req, res, next) => {
  console.log("this is the middleware and it is suppose to run first");
  console.log( req.method);
  console.log( req.body );
  next();
});

// Workout Routes
App.use("/api/workouts", woukoutRoutes);

//  Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // lIstening for requests when connected to the database
    App.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch( (error) => {
    console.log(error);
  });

//  Normal Requests
App.get("/", (req, res) => {
  res.json({ msg: "Welcome to the backend app" });
});
