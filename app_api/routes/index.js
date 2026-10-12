const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)     // GET method routes tripsList
  .post(tripsController.tripsAddTrip); // POST method adds a trip

// GET, PUT, and DELETE methods require the tripCode parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip)
  .delete(tripsController.tripsDeleteTrip);

module.exports = router;
