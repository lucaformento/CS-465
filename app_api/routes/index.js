const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Verify the JWT in the Authorization header before protected routes
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.status(401).json({ message: 'Auth Header Required but NOT PRESENT!' });
  }

  const headers = authHeader.split(' ');
  if (headers.length < 2 || headers[0] !== 'Bearer') {
    console.log('Not enough tokens in Auth Header: ' + headers.length);
    return res.status(401).json({ message: 'Malformed Auth Header' });
  }

  const token = headers[1];
  if (!token) {
    console.log('Null Bearer Token');
    return res.status(401).json({ message: 'Null Bearer Token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.status(401).json({ message: 'Token Validation Error!' });
    }
    req.auth = verified;
    next();
  });
}

// Registration and login endpoints
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// GET is public; POST requires a valid token
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

// GET is public; PUT and DELETE require a valid token
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
