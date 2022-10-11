const { default: mongoose } = require("mongoose");
const Workout = require("../models/workout.model");

//  Get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//  Get a workout 
const getAWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workout!" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout!" });
  }

  return res.status(200).json(workout);
};

//  Create a workout

const createAWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  for ( let x in Object.keys(req.body) ) {
    if ( x.length < 1 || x === null || x === undefined ) emptyFields.push(x);
  };

  if ( emptyFields.length > 0 ) {
    return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
  };

  try {
    const newWorkout = await Workout.create({ title, load, reps });
    return res.status(200).json(newWorkout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Update Workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: " No such Workout!" });
  };

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(404).json({ error: "No such workout!" });
  };

  return res.status(200).json(workout);
};

// Delete Workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: " No such Workout!" });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    return res.status(404).json({ error: "No such Workout!" });
  }

  return res.status(200).json(workout);
};

module.exports = {
  createAWorkout,
  getWorkouts,
  getAWorkout,
  deleteWorkout,
  updateWorkout,
};
