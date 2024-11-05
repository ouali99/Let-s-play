//internal export
const authutils = require("../utils/auth.utils");

const users = [
  {
    id: 1,
    name: "Samy bouibede",
    email: "samy@gmail.com",
    password: "1234",
    isAdmin: true,
    score: 0,
  },
  {
    id: 2,
    name: "ouali",
    email: "ouali@gmail.com",
    password: "qwerty",
    isAdmin: false,
    score: 0,
  },
  {
    id: 3,
    name: "samy ouali",
    email: "samyouali@gmail.com",
    password: "azerty",
    isAdmin: false,
    score: 0,
  },
];


exports.find = () => {
  const nonAdminUsers = [];
  for (let i = 0; i < users.length; i++) {
    // Utilisez i < users.length au lieu de i <= users.length
    const user = users[i];
    if (!authutils.isAdmin(user)) {
      // Vérifiez si l'utilisateur n'est pas un administrateur
      nonAdminUsers.push(user);
    }
  }
  return nonAdminUsers;
};


exports.findById = (id) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.id === parseInt(id)) {
      return user;
    }
  }

  return null;
};


exports.deleteByid = (id) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.id === parseInt(id)) {
      users.splice(i, 1);
      return user;
    }
  }
  return null;
};


exports.create = (name, email, password) => {
  const id = users.length + 1;
  const user = {
    id: id,
    name: name,
    email: email,
    password: password,
    isAdmin: false,
    score: 0,
  };
  users.push(user);
  return user;
};


exports.findByEmail = (email) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email === email) {
      return user;
    }
  }
  return null;
};


exports.wingame = (id) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.id === parseInt(id)) {
      user.score += 1;
    }
  }
  return;
};


exports.losegame = (id) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.id === parseInt(id)) {
      user.score -= 1;
    }
  }
  return;
};


exports.resetscore = (id) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.id === parseInt(id)) {
      user.score = 0;
    }
  }
  return;
};
