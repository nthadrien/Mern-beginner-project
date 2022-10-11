
const express = require("express");
const router = express.Router();

const { createAWorkout , getWorkouts, getAWorkout, updateWorkout, deleteWorkout } = require('../controllers/workout.controller')

//  get all workouts
router.get("/", getWorkouts );

//  get a specific workout
router.get("/:id", getAWorkout );

//p ost a new workout
router.post( '/' ,  createAWorkout );

//  update an existing workout
router.patch("/:id", updateWorkout);

//  delete an existing workout
router.delete("/:id", deleteWorkout );

module.exports = router;
