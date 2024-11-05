//External imports
const express = require("express");


//internal imports
const authen = require("./routes/auth.routes");
const utilisateurs = require("./routes/user.routes");
const gestionP = require("./routes/gameP.routes");
const userMe = require("./routes/me.routes");


//variables
port = 5000;
const app = express();


//body parser
app.use(express.json());
//Router
app.use("/auth", authen);
app.use("/users", utilisateurs);
app.use("/game", gestionP);
app.use("/me", userMe);


//Listner
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
