//external imports
const jwt = require("jsonwebtoken");

//internal imports
const User = require("../model/User");
const authutils = require("../utils/auth.utils");

exports.getUsers = (req, res) => {
  // Vérifie si le token d'authentification est valide
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("not permited");
  }

  // Vérifie si l'utilisateur est un administrateur
  const isAdmin = authutils.isAdmin(req);
  if (!isAdmin) {
    return res.status(401).send("not authorized");
  }
  res.status(200).send(User.find());

};

exports.UpdateUser = (req, res) => {
  // Vérifie si le token d'authentification est valide
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("no update permited");
  }

  // Vérifie si l'utilisateur est un administrateur
  const isAdmin = authutils.isAdmin(req);
  if (!isAdmin) {
    return res.send("not authorized");
  }

  const id = req.params.id;
  const user = User.findById(id);
  if (user === null) {
    return res.send("user not found");
  }

  const email = req.body.email;
  const existingUser = User.findByEmail(email);
  if (existingUser && existingUser.email === email) {
    return res.status(409).send("email already existe");
  }

  user.email = email;
  user.password = req.body.password;
  user.name = req.body.name;

  //reponse
  res.status(200).send("success");
};

exports.deleUser = (req, res) => {
  // Vérifie si le token d'authentification est valide
  const id = req.params.id;
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("not authorized");
  }
  // Vérifie si l'utilisateur est un administrateur
  const isAdmin = authutils.isAdmin(req);
  if (!isAdmin) {
    return res.status(401).send("not authorized");
  }
  const user = User.findById(id);
  if(user ===null){
    return res.status(404).send("user not existe")
  }
  User.deleteByid(id);
  res.status(200).send("deleted");
};

exports.createUser = (req, res) => {
  const isValidToken = authutils.protect(req);
  if (!isValidToken) {
    return res.status(401).send("pas authoriser a acceder a cette route");
  }
  const userid = req.id;

  User.create(req.body);
  const id = req.params.id;
  res.send(User.findById(id));
};
