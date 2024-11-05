//Internal imports
const authutils = require("../utils/auth.utils");
const User = require("../model/User");

exports.getMe = (req, res) => {
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("no  permited");
  }
  
  const user = User.findById(req.id);
  res.status(200).send(user);
};


exports.putMe = (req, res) => {
  const email = req.body.email;
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("no update permited");
  }

  const existingUser = User.findByEmail(email);
  if (existingUser) {
    return res.status(409).send("User already exists with this email");
  }

  User.findById(req.body, req.id);
  res.status(200).send("mise a jour avec succes");
};

exports.delMe = (req, res) => {
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("no delete permited");
  }

  User.deleteByid(req.id);
  res.status(204).send();
};


exports.putMeResetScore = (req, res) => {
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("no reset permited");
  }
  
  User.resetscore(req.body.id);
  res.status(200).send("score reset");
};
