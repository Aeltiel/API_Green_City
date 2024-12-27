const jwt = require("jsonwebtoken");
const sToken = process.env.TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const readToken = jwt.verify(token, sToken);
    const userId = readToken.userId;
    req.auth = { userId: userId };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Token invalide" });
    } else if (error instanceof TypeError) {
      res.status(401).json({ error: "Token Manquant" });
    } else {
      res.status(500).json({ error: "Erreur server" });
    }
  }
};