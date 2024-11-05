//External imports
const express = require("express");
//internal imports
const meController = require("../controllers/me.controllers");

// variable
const router = express.Router();

//Routes
router
  .route("")
  .get(meController.getMe)
  .put(meController.putMe)
  .delete(meController.delMe);

router.route("/reset-score").put(meController.putMeResetScore);

//Export
module.exports = router;
