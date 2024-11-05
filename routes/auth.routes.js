//External imports
const express = require("express");

//internal imports

const authController = require("../controllers/auth.controllers");

// variable
const router = express.Router();

//Routes
router
  .route("/login")
  .post(authController.postLogin);

router
  .route("/register")
  .post(authController.postRegister);

//Export
module.exports = router;
