const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
  try {
    const q = await Model
      .find({}) // No filter, return all records
      .exec();

    // Uncomment the following line to show results of query
    // on the console
    // console.log(q);

    if (!q) {
      // Database returned no data
      return res
        .status(404)
        .json({ message: 'No trips found' });
    } else {
      // Return resulting trip list
      return res
        .status(200)
        .json(q);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message });
  }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
  try {
    const q = await Model
      .find({ 'code': req.params.tripCode }) // Return single record
      .exec();

    // console.log(q);

    if (!q || q.length === 0) {
      // Database returned no data
      return res
        .status(404)
        .json({ message: `Trip not found: ${req.params.tripCode}` });
    } else {
      // Return resulting trip
      return res
        .status(200)
        .json(q);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message });
  }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  try {
    const q = await newTrip.save();

    // console.log(q);

    // Return new trip
    return res
      .status(201)
      .json(q);
  } catch (err) {
    // Validation or database error
    return res
      .status(400)
      .json({ message: err.message });
  }
};

// PUT: /trips/:tripCode - Updates a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);

  try {
    const q = await Model
      .findOneAndUpdate(
        { 'code': req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        },
        { new: true, runValidators: true }
      )
      .exec();

    if (!q) {
      // Database returned no data
      return res
        .status(404)
        .json({ message: `Trip not found: ${req.params.tripCode}` });
    } else {
      // Return resulting updated trip
      return res
        .status(201)
        .json(q);
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message });
  }
};

// DELETE: /trips/:tripCode - Deletes a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsDeleteTrip = async (req, res) => {
  try {
    const q = await Model
      .findOneAndDelete({ 'code': req.params.tripCode })
      .exec();

    if (!q) {
      // Database returned no data
      return res
        .status(404)
        .json({ message: `Trip not found: ${req.params.tripCode}` });
    } else {
      // Confirm the deleted trip
      return res
        .status(200)
        .json({ message: `Trip deleted: ${req.params.tripCode}` });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
