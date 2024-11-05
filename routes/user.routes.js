//External imports
const express = require("express");

//internal imports
const usersController = require("../controllers/user.controllers");

// variable
const router = express.Router();

//Routes
router.route("").get(usersController.getUsers);

router
  .route("/:id")
  .put(usersController.UpdateUser)
  .delete(usersController.deleUser);

//Export
module.exports = router;
