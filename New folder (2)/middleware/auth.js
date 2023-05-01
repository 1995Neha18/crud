const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(400).send({ msg: "token not found" });
    return;
  }
  jwt.verify(token, "neha", (err, decoded) => {
    if (err) {
      return res.status(400).send({ err: err.message });
    }
    if (decoded) {
      req.body.authorID = decoded.authorID;
      next();
    } else {
      res.status(400).send({ msg: "Invalid Token" });
    }
  });
};

module.exports = auth;
