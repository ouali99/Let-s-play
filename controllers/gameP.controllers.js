//External imorts
const jwt = require("jsonwebtoken");
const authutils = require("../utils/auth.utils");

//internal imports
const User = require("../model/User");

exports.putGameWins = (req, res) => {
  // Vérifier si le Token est valide
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("no  permited");
  }
  const id = req.body.id;
  const user = User.wingame(id);

  res.status(201).send("Pointage mis à jour de l'utilisateur");
};
exports.putGamelost = (req, res) => {
  // Vérifier si le Teton est valide
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("no  permited");
  }
  const id = req.body.id;
  const user = User.losegame(id);
  res.status(201).send("Pointage mis à jour de l'utilisateur");
};
