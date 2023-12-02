const jwt = require("jsonwebtoken");
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req?.headers?.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Token missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token",error:err });
    }
    req.user = decoded;
    next();
  });
}

module.exports = {
  verifyToken,
};
