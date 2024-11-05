//External import
const jwt = require("jsonwebtoken");

//Internal import
const User = require("../model/User");

exports.protect = (req) => {
  try {
    //1.Recuperer le token
    let token = req.headers.authorization;

    //2.Token == undefined || il commence pas par le mot bearer

    if (token === undefined || !token.startsWith("Bearer")) {
      console.log("Bearer token");
      return false;
    }
    //3.Enlever le mot bearer du token
    token = token.split(" ")[1];

    //4. Decrypter
    const tokendecoded = jwt.verify(token, "play");
    req.id = tokendecoded.id;

    return true;
  } catch (error) {
    return false;
  }
};

exports.isAdmin = (req) => {
  //Recuperer le id du req
  const userid = req.id;

  //Verifier si la personne existe dans la liste
  const user = User.findById(userid);
  if (user === null) {
    return false;
  }

  //S'assurer que la personne est admin
  if (!user.isAdmin) {
    return false;
  }
  return true;
};
