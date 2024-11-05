//External import
const jwt = require("jsonwebtoken");

//Internal imports
const User = require("../model/User");
const authutils = require("../utils/auth.utils");


exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Vérifier si l'email ou le mot de passe est manquant ou vide
  if (email === undefined || email.trim() === "") {
    return res.status(400).send("invalid email");
  }

  if (password === undefined || password.trim() === "") {
    return res.status(400).send("invalid password");
  }

  // Vérifier si aucun utilisateur n'a été trouvé avec l'email fourni
  const user = User.findByEmail(email);
  if (user === null) {
    return res.status(401).send("no user found with email");
  }

  // Comparer le mot de passe fourni avec le mot de passe de l'utilisateur
  if (user.password !== password) {
    return res.status(400).send("invalid password");
  }
  // Générer un token
  const token = jwt.sign({ id: user.id }, "play");
  res.status(200).send(token);
};

exports.postRegister = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const existingemail = User.findByEmail(email);

  const newuse = User.create(name, email, password);

  // Vérifier si l'email ou le mot de passe est manquant ou vide
  if (email === undefined || email.trim() === "") {
    return res.status(400).send("invalide email");
  }

  if (password === undefined || password.trim() === "") {
    return res.status(400).send("invalide mot de passe");
  }
   // Vérifier si aucun utilisateur n'a été trouvé avec l'email fourni
  if(existingemail){
    return res.status(409).send("email deja existant")
  }


  // Générer un token
  const token = jwt.sign({ id: newuse.id }, "play");
  res.status(201).send(token);
};
