const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.models");

const routes = express();


routes.post("/register", async (req, res) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({username: req.body.username, password: hashedPassword,});
    await user.save();
    res.status(201).json({ message: "Utente registrato" });

  } catch (err) {

    res.status(403).json({ message: "Registrazione non effettuata" });
  }
});


routes.post("/login", async (req, res) => {
  const user = await User.findOne({username: req.body.username,});

  if (!user) {
    return res.status(404).json({ message: "l'utente non esiste nel DB" });
  }

  try {
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password errata" });
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
     const accessToken = jwt.sign({ userId: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ accessToken });
      console.log('TOKEN: ' + accessToken)
    }

  } catch (err) {

    res.status(403).json({ message: err.message || "Autorizzazione non concessa" });
  }
});

module.exports = routes;
