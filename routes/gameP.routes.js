//External imports
const express = require("express");

// internal imports
const gameP = require("../controllers/gameP.controllers");

// variable
const router = express.Router();

//Routes
router
  .route("/wins")
  .put(gameP.putGameWins);

router
  .route("/lost")
  .put(gameP.putGamelost);

//Export
module.exports = router;
