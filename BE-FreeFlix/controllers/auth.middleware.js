const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token mancante" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token non valido" });

    req.user = user;
    next();
  });
};

module.exports = authToken;
